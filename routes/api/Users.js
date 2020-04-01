const express = require('express');
const nodemailer = require('nodemailer');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require('config');
const uuid = require('uuid');
const multer = require('multer');
const {
    check,
    validationResult
} = require('express-validator');

const auth = require('../../middleware/auth');
const User = require('../../models/users');

//functions for uploading image 
// setting where file will be uploaded and renaming file
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/plofile_img/')
    },
    filename: function (req, file, cb) {
        cb(null, new Date().toISOString() + file.originalname)
    }
})
const upload = multer({
    storage: storage
});

//function for creating round number and string for password
const randomStringNumber = () => {
    var chars = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXTZabcdefghiklmnopqrstuvwxyz";
    var string_length = 8;
    var randomstring = '';
    for (var i = 0; i < string_length; i++) {
        var rnum = Math.floor(Math.random() * chars.length);
        randomstring += chars.substring(rnum, rnum + 1);
    }
    return randomstring;
}

//setting router
const router = express.Router();

//setting config for an emailsender
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'imihigoms@gmail.com',
        pass: config.get('mailpassword')
    }
});

// @route   POST user/
// @desc    Insert new user by admin
// @access  Private
router.post(
    '/',
    [
        auth,
        [
            check('names', 'names required')
            .not()
            .isEmpty(),
            check('email', 'E-mail is invalid').isEmail(),
            check('phone_number', 'Phone Number is required')
            .not()
            .isEmpty()
        ]
    ],
    async (req, res, next) => {
        //checking errors
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({
                errors: errors.array()
            });
        }

        const {
            names,
            email,
            phone_number
        } = req.body;
        const password = randomStringNumber();
        try {
            let user = await User.getUserByEmail(email);
            if (user.length > 0) {
                return res.status(400).json({
                    errors: [{
                        msg: 'User already exists',
                        result: user
                    }]
                });
            }
            user = {
                id: uuid.v1(),
                names,
                email,
                phone_number,
                nid: uuid.v4(),
                password: password
            };
            const salt = await bcrypt.genSalt(10);
            user.password = await bcrypt.hash(user.password, salt);

            const results = await User.createNewUser(user);
            if (results) {
                const mailOptions = {
                    from: 'imihigoms@gmail.com',
                    to: 'ij.gabin123@gmail.com', //change this to your email
                    subject: 'Pledges MS Sign up Succesfully ',
                    text: `You have succesfully sign up to Pledges MS your password is ${password} and username is ${email}`
                };
                transporter.sendMail(mailOptions, (error, info) => {
                    if (error) {
                        return res.status(400).json({
                            errors: 'user Created but mail not send',
                            result: results,
                            mail_error: error.message
                        });
                    } else {
                        return res.status(200).json({
                            msg: 'user Created',
                            result: results,
                            mailResponse: info.response
                        });
                    }
                });
            }
        } catch (error) {
            return res.status(500).json({
                errors: [{
                    msg: 'server error',
                    errormsg: error.message,
                    error: error
                }]
            });
        }
    }
);

// @route   Get user/:id
// @desc    Get one User by id
// @access  Private
router.get('/:id', [auth, [
    check('id', 'Id is Reaquired').not().isEmpty()
]], async (req, res) => {
    try {
        const user = await User.getUserById(req.params.id);
        if (user.length > 0) {
            return res.status(200).json({
                msg: 'Get User by Id',
                result: user,
                resultCount: user.length
            })
        } else {
            return res.status(400).json({
                errors: [{
                    msg: 'User Not found',
                }]
            });
        }
    } catch (error) {
        return res.status(500).json({
            errors: [{
                msg: 'server error',
                errormsg: error.message,
                error: error
            }]
        });
    }
});

// @route   Get user/
// @desc    Get All Users
// @access  Private
router.get('/', auth, async (req, res, next) => {
    try {
        const users = await User.getAllUsers();
        if (users) {
            return res.status(200).json({
                msg: 'Get All Users',
                result: users,
                resultCount: users.length
            });
        }
    } catch (error) {
        return res.status(500).json({
            errors: [{
                msg: 'server error',
                errormsg: error.message,
                error: error
            }]
        });
    }
})

// @route   Put user/:id
// @desc    Upadate User by id
// @access  Private
router.put('/:id', auth, upload.single('profile'), [
    check('nid', 'Id Number is Required').not().isEmpty(),
    check('email', 'E-mail is invalid').isEmail(),
    check('phone_number', 'Phone Number is Required').not().isEmpty(),
    check('username', 'Username Is Required')
], async (req, res, next) => {
    //checking errors
    const errors = validationResult(req.body);
    if (!errors.isEmpty()) {
        return res.status(400).json({
            errors: errors.array()
        });
    }
    const {
        nid,
        email,
        username,
        names,
        dob,
        phone_number
    } = req.body;
    const profile = req.file.path;
    try {
        let user = await User.getUserById(req.params.id);
        if (user.length === 0) {
            return res.status(400).json({
                errors: [{
                    msg: 'Invalid User Id',
                    result: user,
                    resultCount: user.length
                }]
            });
        }
        user = {
            nid,
            email,
            username,
            names,
            profile,
            dob,
            phone_number
        }
        const update = await User.updateUserById(req.params.id, user);
        if (update) {
            return res.status(400).json({
                msg: 'User Profile Updated Successfuly',
                result: update,
                resultCount: update.length
            })
        }
    } catch (error) {
        return res.status(500).json({
            errors: [{
                msg: 'server error',
                errormsg: error.message,
                error: error
            }]
        });
    }
})

// @route   Put user/:id/password/
// @desc    Upadate User password
// @access  Private
router.put('/:id/password', auth, [
    check('password', 'Password is required').not().isEmpty(),
    check('comfirm_password', 'Comfirm Password is required').not().isEmpty(),
    check('current_password', 'Current Password is Required').not().isEmpty()
], async (req, res) => {
    //checking errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({
            errors: errors.array()
        });
    }
    const {
        password,
        comfirm_password,
        current_password
    } = req.body;
    //checking if password matchs
    if (password !== comfirm_password) {
        return res.status(400).json({
            errors: [{
                msg: 'Password do not Match!'
            }]
        });
    }
    try {
        const user = await User.getUserById(req.params.id);
        if (user.length === 0) {
            return res.status(400).json({
                errors: [{
                    msg: 'Invalid User Id',
                }]
            });
        };

        const isMatch = await bcrypt.compare(current_password, user[0].password);
        if (!isMatch) {
            return res.status(400).json({
                errors: [{
                    msg: 'Current Password is Invalid',
                }]
            });
        }

        const salt = await bcrypt.genSalt(10);
        const newPassword = await bcrypt.hash(password, salt);

        const updatePass = await User.updateUserPassword(req.params.id, newPassword);
        if (updatePass) {
            return res.status(200).json({
                msg: 'User Password Updated Successfuly',
                result: updatePass,
                resultCount: updatePass.length
            })
        }
    } catch (error) {
        return res.status(500).json({
            errors: [{
                msg: 'server error',
                errormsg: error.message,
                error: error
            }]
        });
    }
})

module.exports = router;