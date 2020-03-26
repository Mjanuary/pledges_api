const express = require('express');
const router = express.Router();
const pool = require('../../config/db');

// importing express-validator
const {
  check,
  validationResult
} = require('express-validator');

// @route   GET districts/sectors/:district_id
// @desc    List all sector in a district
// @access  Public
router.get('/sectors/:district_id', [
  check('district_id', 'district id is required')
  .not()
  .isEmpty()
], async (req, res) => {
  try {
    const errors = validationResult(req);
    // check is there is errors & return them
    if (!errors.isEmpty()) {
      return res.status(400).json({
        errors: errors.array()
      });
    }

    const district_id = parseInt(req.params.district_id)

    let results = await pool.query('SELECT tbl_district.district_name AS district, tbl_sector.sector_name AS sector_name, tbl_sector.sector_id AS sector_id FROM tbl_district, tbl_sector WHERE tbl_district.district_id = tbl_sector.district_id AND tbl_district.system_access = true AND tbl_sector.status = true AND tbl_district.district_id = $1', [district_id])
    res.status(200).json(results.rows)

  } catch (error) {
    console.log(error.message);
    res.status(500).send({
      error: 'Server Error'
    });
  }
});


// @route   GET districts/cell/:district_id
// @desc    List all sector in a district
// @access  Public
router.get('/cells/:sector_id', [
  check('sector_id', 'sector id is required')
  .not()
  .isEmpty()
], async (req, res) => {
  try {
    const errors = validationResult(req);
    // check is there is errors & return them
    if (!errors.isEmpty()) {
      return res.status(400).json({
        errors: errors.array()
      });
    }

    const sector_id = parseInt(req.params.sector_id)

    let results = await pool.query('SELECT tbl_sector.sector_name AS sector, tbl_cell.cell_name AS cell_name, tbl_cell.cell_id AS cell_id FROM tbl_sector, tbl_cell WHERE tbl_sector.sector_id = tbl_cell.sector_id AND tbl_sector.status = true AND tbl_cell.status = true AND tbl_sector.sector_id = $1', [sector_id])
    res.status(200).json(results.rows)

  } catch (error) {
    console.log(error.message);
    res.status(500).send({
      error: 'Server Error'
    });
  }
});


module.exports = router;