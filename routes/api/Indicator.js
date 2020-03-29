const express = require('express');
const uuid = require('uuid');
const {
    check,
    validationResult
} = require('express-validator');

const auth = require('../../middleware/auth');
const Academic = require('../../models/accademic_year');
const Indicator = require('../../models/indicator');

const router = express.Router();

// @route   POST indicator/
// @desc    Insert new indicator
// @access  Private
router.post('/', [auth, [
    check('accademic_id', 'Academic title is required').not().isEmpty(),
    check('indicator_title', 'Start date is required').exists(),
    check('indicator_description', 'End Date is required').exists()
]], async (req, res) => {
    const errors = validationResult(req);
    // check is there is errors & return them
    if (!errors.isEmpty()) {
        return res.status(400).json({
            errors: errors.array()
        });
    }
    const {
        accademic_id,
        indicator_title,
        indicator_description
    } = req.body
    try {
        const data = {
            id: uuid.v4(),
            accademic_id,
            indicator_title,
            indicator_description
        }

        //check if academic year id valid
        const exists = await Academic.getAcademicYearById(accademic_id);
        if (!exists) {
            return res.status(400).json({
                errors: [{
                    msg: 'Invalid Academic Year Id',
                    result: [],
                    resultCount: 0
                }]
            });
        }

        const results = await Indicator.createNewIndicator(data);
        if (results) {
            return res.status(200).json({
                msg: 'New Indicator Created',
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

// @route   GET indicator/:id
// @desc    Get a indicator by id
// @access  Private
router.get('/:id', auth, async (req, res) => {
    try {
        const results = await Indicator.getIndicatorById(req.params.id);
        if (results.length > 0) {
            return res.status(200).json({
                msg: 'Get Indicator by Id',
                result: results,
                resultCount: results.length
            })
        } else {
            return res.status(400).json({
                errors: [{
                    msg: 'Invalid Indicator id',
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

// @route   PUT indicator/:id
// @desc    Update a indicator year
// @access  Private
router.put('/:id', [auth, [
    check('accademic_id', 'Academic title is required').not().isEmpty(),
    check('indicator_title', 'Start date is required').exists(),
    check('indicator_description', 'End Date is required').exists(),
]], async (req, res) => {
    const errors = validationResult(req);
    // check is there is errors & return them
    if (!errors.isEmpty()) {
        return res.status(400).json({
            errors: errors.array()
        });
    }
    const {
        accademic_id,
        indicator_title,
        indicator_description
    } = req.body
    try {
        const data = {
            id: req.params.id,
            accademic_id,
            indicator_title,
            indicator_description
        }
        //check if academic year and indicator id are valid
        const indicatorExists = await Indicator.getIndicatorById(req.params.id);

        const academicExists = await Academic.getAcademicYearById(accademic_id);

        if (indicatorExists.length === 0 || academicExists.length === 0) {
            const existsText = academicExists.length === 0 ? 'Academic Year' : 'Indicator';
            return res.status(400).json({
                errors: [{
                    msg: `Invalid ${existsText} Id`,
                    result: [],
                    resultCount: 0
                }]
            });
        }

        const results = await Indicator.updateIndicatorById(data);
        if (results) {
            return res.status(200).json({
                msg: 'New indicator Updated',
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

// @route   DELETE indicator/:id
// @desc    Delete a Indicator
// @access  Private
router.delete('/:id', auth, async (req, res) => {
    try {
        const data = {
            id: req.params.id,
            status: false
        }

        //check if indicator is id valid
        const exists = await Indicator.getIndicatorById(req.params.id);
        if (exists.length === 0) {
            return res.status(400).json({
                errors: [{
                    msg: 'Invalid Indicator Id',
                    result: exists,
                    resultCount: 0
                }]
            });
        }
        const results = await Indicator.updateIndicatorStatus(data);
        if (results) {
            return res.status(200).json({
                msg: 'New Indicator Deleted',
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