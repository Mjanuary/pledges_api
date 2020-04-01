const express = require('express');
const uuid = require('uuid');
const {
  check,
  validationResult
} = require('express-validator');

const auth = require('../../middleware/auth');
const District = require('../../models/tbl_district');

const router = express.Router();

// @route   POST district/
// @desc    Insert new district
// @access  Private
router.post(
  '/',
  auth,
  [
    check('district_name', 'District Name is required')
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
    const district_name = req.body.district_name;
    try {
      const data = {
        id: uuid.v4(),
        district_name
      };
      //check if District exists
      const exists = await District.getDistrictByname(district_name);
      if (exists.length > 0) {
        return res.status(200).json({
          msg: 'District Already Exists',
          result: results,
          resultCount: results.length
        });
      }
      //insert
      const results = await District.insertNewDistrict(data);
      if (results) {
        return res.status(200).json({
          msg: 'District Inserted',
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

// @route   GET district/:id
// @desc    get district details
// @access  Private
router.get('/:id', auth, async (req, res) => {
  const id = req.params.id
  try {
    const results = await District.getDistrictById(id);
    if (results.length > 0) {
      return res.status(200).json({
        msg: 'Get District Details',
        result: results,
        resultCount: results.length
      });
    } else {
      return res.status(400).json({
        errors: [{
          msg: 'Invalid District Id',
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

// @route   GET district/
// @desc    get all district
// @access  Private
router.get('/', auth, async (req, res) => {
  try {
    const results = await District.getAllDistrict();
    if (results) {
      return res.status(200).json({
        msg: 'Get all District',
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

// @route   Get district/:id/sector
// @desc    Get all District Sector
// @access  Private
router.get('/:id/sector', auth, async (req, res) => {
  const id = req.params.id
  try {
    const check = await District.getDistrictById(id);
    if (check.length === 0) {
      return res.status(400).json({
        errors: [{
          msg: 'Invalid District Id',
          result: [],
          resultCount: 0
        }]
      });
    }
    const results = await District.getDistrictSector(id);
    if (results) {
      return res.status(200).json({
        msg: 'Get all Sector in District',
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