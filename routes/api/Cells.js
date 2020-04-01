const express = require('express');
const uuid = require('uuid');
const {
    check,
    validationResult
} = require('express-validator');

const auth = require('../../middleware/auth');
const Cell = require('../../models/tbl_cell');
const Sector = require('../../models/tbl_sector');

const router = express.Router();

// @route   POST cell/
// @desc    Insert new Cell
// @access  Private
router.post(
    '/',
    auth,
    [
        check('cell_name', 'Cell Name is required')
        .not()
        .isEmpty(),
        check('cell_code', 'Cell Code is required')
        .not()
        .isEmpty()
    ],
    async (req, res) => {
        const errors = validationResult(req);
        // check is there is errors & return them
        if (!errors.isEmpty()) {
            return res.status(400).json({
                errors: errors.array()
            });
        }
        const cell_name = req.body.cell_name;
        const cell_code = req.body.cell_code;
        try {
            const data = {
                id: uuid.v4(),
                cell_name,
                cell_code
            };
            //check if Cell exists
            const exists = await Cell.getCellByname(cell_name);
            if (exists.length > 0) {
                return res.status(200).json({
                    msg: 'Cell Already Exists',
                    result: results,
                    resultCount: results.length
                });
            }
            //insert
            const results = await Cell.insertNewCell(data);
            if (results) {
                return res.status(200).json({
                    msg: 'Cell Inserted',
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
    }
);

// @route   GET cell/:id
// @desc    get Cell details
// @access  Private
router.get('/:id', auth, async (req, res) => {
    const id = req.params.id
    try {
        const results = await Cell.getCellById(id);
        if (results.length > 0) {
            const sectorId = results[0].sector_id;
            return res.status(200).json({
                msg: 'Get Cell Details',
                result: results,
                resultCount: results.length,
                other: {
                    from_sector: await Sector.getSectorById(sectorId)
                }
            });
        } else {
            return res.status(400).json({
                errors: [{
                    msg: 'Invalid Cell Id',
                    result: [],
                    resultCount: 0
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

// @route   GET cell/
// @desc    get all Cell
// @access  Private
router.get('/', auth, async (req, res) => {
    try {
        const results = await Cell.getAllCell();
        if (results) {
            return res.status(200).json({
                msg: 'Get all Cell',
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

module.exports = router;