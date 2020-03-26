const express = require('express');
const nodemail = require('nodemailer');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require('config');
const {
    check,
    validationResult
} = require('express-validator');

const auth = require('../../middleware/auth');

const router = express.Router();

// @route   POST user/
// @desc    Insert new user by admin
// @access  Private
routr.post('/', [auth, [
    check()
]], async (req, res, next) => {

})





module.exports = router;