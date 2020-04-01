const express = require('express');
const uuid = require('uuid');
const {
  check,
  validationResult
} = require('express-validator');

const auth = require('../../middleware/auth');
const Province = require('../../models/tbl_province');

const router = express.Router();

// @route   POST province/
// @desc    Insert new province
// @access  Private
router.post(
  '/',
  auth,
  [
    check('province_name', 'Province Name is required')
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
    const province_name = req.body.province_name;
    try {
      const data = {
        id: uuid.v4(),
        province_name
      };
      //check if prinve exists
      const exists = await Province.getProvinceByname(province_name);
      if (exists.length > 0) {
        return res.status(200).json({
          msg: 'Province Already Exists',
          result: results,
          resultCount: results.length
        });
      }
      //insert
      const results = await Province.insertNewProvince(data);
      if (results) {
        return res.status(200).json({
          msg: 'Province Inserted',
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

// @route   GET province/
// @desc    get all province
// @access  Private
router.get('/', auth, async (req, res) => {
  try {
    const results = await Province.getAllProvinces();
    if (results) {
      return res.status(200).json({
        msg: 'Get all Province',
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

// @route   Get province/:id/district
// @desc    Get all Province District
// @access  Private
router.get('/:id/district', auth, async (req, res) => {
  try {
    const check = await Province.getProvinceById(id);
    if (check.length === 0) {
      return res.status(400).json({
        errors: [{
          msg: 'Invalid Province Id',
          result: [],
          resultCount: 0
        }]
      });
    }
    const results = await Province.getAllProvinces();
    if (results) {
      return res.status(200).json({
        msg: 'Get all Province',
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