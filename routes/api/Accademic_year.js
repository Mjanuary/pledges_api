const express = require('express');
const uuid = require('uuid');
const {
    check,
    validationResult
} = require('express-validator');

const auth = require('../../middleware/auth');
const Academic = require('../../models/accademic_year');

const router = express.Router();

// @route   POST academic/
// @desc    Insert a academic year
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
            accademic_title,
            start_date,
            end_date,
            registered_date: new Date().toISOString()
        }

        const results = await Academic.createNewAccademicYear(data);
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

// @route   GET academic/:id
// @desc    Get a Academic year by id
// @access  Private
router.get('/:id', auth, async (req, res) => {
    try {
        const results = await Academic.getAcademicYearById(req.params.id);
        if (results) {
            return res.status(200).json({
                msg: 'Get Academic year by Id',
                result: results,
                resultCount: results.length
            })
        } else {
            return res.status(400).json({
                errors: [{
                    msg: 'Invalid Academic year id',
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
})

// @route   PUT academic/:id
// @desc    Update a Academic year
// @access  Private
router.put('/:id', [auth, [
    check('accademic_title', 'Academic title is required').not().isEmpty(),
    check('start_date', 'Start date is required').exists(),
    check('end_date', 'End Date is required').exists(),
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
            id: req.params.id,
            accademic_title,
            start_date,
            end_date,
            updated_date: new Date().toISOString()
        }
        //check if academic year id valid
        const exists = await Academic.getAcademicYearById(req.params.id);
        if (!exists) {
            return res.status(400).json({
                errors: [{
                    msg: 'Invalid Academic Year Id',
                    result: exists,
                    resultCount: exists.length
                }]
            });
        }
        const results = await Academic.updateAccademicYearById(data);
        if (results) {
            return res.status(200).json({
                msg: 'New Academic Year Updated',
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
})

// @route   DELETE academic/:id
// @desc    Delete a Academic year
// @access  Private
router.delete('/:id', auth, async (req, res) => {
    try {
        const data = {
            id: req.params.id,
            status: false
        }

        //check if academic year id valid
        const exists = await Academic.getAcademicYearById(req.params.id);
        if (!exists) {
            return res.status(400).json({
                errors: [{
                    msg: 'Invalid Academic Year Id',
                    result: exists,
                    resultCount: exists.length
                }]
            });
        }
        const results = await Academic.updateAcademicYearStatus(data);
        if (results) {
            return res.status(200).json({
                msg: 'New Academic Year Deleted',
                result: [],
                resultCount: 0
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

module.exports = router;