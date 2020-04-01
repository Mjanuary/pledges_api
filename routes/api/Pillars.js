const express = require('express');
const {
    v4: uuidv4
} = require('uuid');
const {
    check,
    validationResult
} = require('express-validator');

const auth = require('../../middleware/auth');
const Pillar = require('../../models/pillars');

const router = express.Router();

// @route   GET pillars/
// @desc    List all pillars
// @access  Public
router.get('/', async (req, res) => {
    try {

        let results = await Pillar.getAllPillars();
        if (results) {
            return res.status(200).json({
                msg: 'Get All Pillars',
                result: results,
                resultCount: results.length
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


// // @route   POST pillars/
// // @desc    Insert a pillar
// // @access  Private
router.post('/', [auth, [
    check('title', 'pillar id is required')
    .not()
    .isEmpty(),
]], async (req, res) => {
    const errors = validationResult(req);
    // check is there is errors & return them
    if (!errors.isEmpty()) {
        return res.status(400).json({
            errors: errors.array()
        });
    }
    const {
        title,
        description
    } = req.body
    try {
        const data = {
            id: uuidv4(),
            title,
            description
        }

        let results = await Pillar.createNewPillar(data);
        if (results) {
            return res.status(200).json({
                msg: 'New Pillar Created',
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



// @route   PUT pillars/:pillar_id
// @desc    Update pillar
// @access  Private
router.put('/:pillar_id', [auth, [
    check('pillar_id', 'pillar_id is required')
    .not()
    .isEmpty(),
    check('title', 'title is required')
    .not()
    .isEmpty(),
    check('description', 'description is required')
    .not()
    .isEmpty(),
]], async (req, res) => {
    const errors = validationResult(req);
    // check is there is errors & return them
    if (!errors.isEmpty()) {
        return res.status(400).json({
            errors: errors.array()
        });
    }

    const {
        title,
        description
    } = req.body
    const pillar_id = req.params.pillar_id
    try {
        const data = {
            id: pillar_id,
            title,
            description
        }

        // cehck if the pillar exists
        const exists = await Pillar.getPillarById(pillar_id);
        if (exists.length === 0) {
            return res.status(400).json({
                errors: [{
                    msg: 'Invalid Pillar Id',
                    result: exists,
                    resultCount: exists.length
                }]
            });
        }
        // update
        let results = await Pillar.updatePillarById(data);
        if (results) {
            return res.status(200).json({
                msg: 'Pillar Updated',
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




// @route   DELETE pillars/:pillar_id
// @desc    Update pillar
// @access  Private
router.delete('/:pillar_id', [auth, [
    check('pillar_id', 'pillar_id is required')
    .not()
    .isEmpty()
]], async (req, res) => {
    const errors = validationResult(req);
    // check is there is errors & return them
    if (!errors.isEmpty()) {
        return res.status(400).json({
            errors: errors.array()
        });
    }
    const pillar_id = req.params.pillar_id
    try {
        // cehck if the pillar exists
        const exists = await Pillar.getPillarById(pillar_id);
        if (exists.length === 0) {
            return res.status(400).json({
                errors: [{
                    msg: 'Invalid Pillar Id',
                    result: exists,
                    resultCount: exists.length
                }]
            });
        }
        // update
        let results = await Pillar.updatePillaStatus({
            id: pillar_id,
            status: false
        })
        if (results) {
            return res.status(200).json({
                msg: 'Pillar Deleted',
                result: {},
                resultCount: results.length
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



module.exports = router;