const express = require('express');
const {
    check,
    validationResult
} = require('express-validator');

const auth = require('../../middleware/auth');
const Academic = require('../../models/accademic_year');

const router = express.Router();

// @route   POST pillars/
// @desc    Insert a pillar
// @access  Private
router.post('/', [auth, [
    check('accademic_title', 'Academic title is required').not().isEmpty(),
    check('start_date', 'Start date is required').exists(),
    check('end_date', 'End Date is required').exists()
]], async (req, res) => {
    const errors = validationResult(req);
    // check is there is errors & return them
    if (!errors.isEmpty()) {
        return res.status(400).json({
            errors: errors.array()
        });
    }
    const {
        accademic_title,
        start_date,
        end_date
    } = req.body
    try {
        const data = {
            id: uuidv4(),
            accademic_title,
            start_date,
            end_date,
            registered_date: new Date().toISOString()
        }

        let results = await Academic.createNewAccademicYear(data);
        if (results) {
            return res.status(200).json({
                msg: 'New Academic Year Created',
                result: [data],
                resultCount: 1
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