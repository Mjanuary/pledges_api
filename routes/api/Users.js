const express = require('express');
const nodemailer = require('nodemailer');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require('config');
const uuid = require('uuid');

const {
    check,
    validationResult
} = require('express-validator');

const auth = require('../../middleware/auth');
const User = require('../../models/users');

const router = express.Router();
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'ij.gabin123@gmail.com',
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
                    from: 'ij.gabin123@gmail',
                    to: 'janviermuhawenimana@gmail.com',
                    subject: 'Pledges MS Sign up Succesfully ',
                    text: `You have succesfully sign up to Pledges MS your password is 123456 and usernma is ${email}`
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
                    error: error
                }]
            });
        }
    }
);

module.exports = router;