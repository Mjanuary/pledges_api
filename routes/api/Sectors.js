const express = require('express');
const uuid = require('uuid');
const {
    check,
    validationResult
} = require('express-validator');

const auth = require('../../middleware/auth');
const Sector = require('../../models/tbl_sector');
const District = require('../../models/tbl_district');

const router = express.Router();

// @route   POST sectors/
// @desc    Insert new sector
// @access  Private
router.post(
    '/',
    auth,
    [
        check('sector_name', 'Sector Name is required')
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
        const sector_name = req.body.sector_name;
        try {
            const data = {
                id: uuid.v4(),
                sector_name
            };
            //check if Sector exists
            const exists = await Sector.getSectorByname(sector_name);
            if (exists.length > 0) {
                return res.status(200).json({
                    msg: 'Sector Already Exists',
                    result: results,
                    resultCount: results.length
                });
            }
            //insert
            const results = await Sector.insertNewSector(data);
            if (results) {
                return res.status(200).json({
                    msg: 'Sector Inserted',
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

// @route   GET Sectors/:id
// @desc    get Sector details
// @access  Private
router.get('/:id', auth, async (req, res) => {
    const id = req.params.id
    try {
        const results = await Sector.getSectorById(id);
        if (results.length > 0) {
            const districtId = results[0].district_id;
            return res.status(200).json({
                msg: 'Get Sector Details',
                result: results,
                resultCount: results.length,
                other: {
                    from_district: await District.getDistrictById(districtId),
                    has_cells: await Sector.getSectorCell(id)
                }
            });
        } else {
            return res.status(400).json({
                errors: [{
                    msg: 'Invalid Sector Id',
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

// @route   GET Sectors/
// @desc    get all Sector
// @access  Private
router.get('/', auth, async (req, res) => {
    try {
        const results = await Sector.getAllSector();
        if (results) {
            return res.status(200).json({
                msg: 'Get all Sector',
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

// @route   Get Sectors/:id/cell
// @desc    Get all Sector cells
// @access  Private
router.get('/:id/cell', auth, async (req, res) => {
    const id = req.params.id
    try {
        const check = await Sector.getSectorById(id);
        if (check.length === 0) {
            return res.status(400).json({
                errors: [{
                    msg: 'Invalid Sector Id',
                    result: [],
                    resultCount: 0
                }]
            });
        }
        const results = await Sector.getSectorCell(id);
        if (results) {
            return res.status(200).json({
                msg: 'Get all Cells in Sector',
                other: {
                    From_sector: check
                },
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