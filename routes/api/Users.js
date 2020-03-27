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
const router = express.Router();
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

        try {
            let user = await User.getUserByEmail(email);
            if (user) {
                return res.status(400).json({
                    errors: [{
                        message: 'User already exists',
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
                password: '123456'
            };
            const salt = await bcrypt.genSalt(10);
            user.password = await bcrypt.hash(user.password, salt);

            const results = await User.createNewUser(user);
            if (results) {
                const mailOptions = {
                    from: 'imihigoms@gmail.com',
                    to: 'ij.gabin123@gmail.com',
                    subject: 'Pledges MS Sign up Succesfully ',
                    text: `You have succesfully sign up to Pledges MS your password is 123456 and username is ${email}`
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
                            message: 'user Created',
                            result: results,
                            mailResponse: info.response
                        });
                    }
                });
            }
        } catch (error) {
            return res.status(500).json({
                errors: [{
                    message: 'server error',
                    errorMessage: error.message,
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
        if (user) {
            return res.status(200).json({
                message: 'Get User by Id',
                result: user,
                resultCount: user.length
            })
        } else {
            return res.status(400).json({
                errors: [{
                    message: 'User Not found',
                }]
            });
        }
    } catch (error) {
        return res.status(500).json({
            errors: [{
                message: 'server error',
                errorMessage: error.message,
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
                message: 'Get All Users',
                result: users,
                resultCount: users.length
            });
        }
    } catch (error) {
        return res.status(500).json({
            errors: [{
                message: 'server error',
                errorMessage: error.message,
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
        if (!user) {
            return res.status(400).json({
                errors: [{
                    message: 'User Not exists',
                    result: user
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
                message: 'User Updated Successfuly',
                result: update,
                resultCount: update.length
            })
        }
    } catch (error) {
        return res.status(500).json({
            errors: [{
                message: 'server error',
                errorMessage: error.message,
                error: error
            }]
        });
    }
})

module.exports = router;