const express = require('express');
const router = express.Router();
const pool = require('../../config/db');
const auth = require('../../middleware/auth');
const { v4: uuidv4 } = require('uuid');
// importing express-validator
const { check, validationResult } = require('express-validator');

// @route   GET pillars/
// @desc    List all pillars
// @access  Public
router.get('/', async (req, res) => {
    try {
    
        let results = await pool.query('SELECT * FROM pillars  WHERE status = true')
        res.status(200).json(results.rows)
    
    } catch (error) {
      console.log(error.message);
      res.status(500).send({ error:'Server Error'});
    }
});


// // @route   POST pillars/
// // @desc    Insert a pillar
// // @access  Private
router.post('/', [ auth, [
    check('title', 'pillar id is required')
      .not()
      .isEmpty(),
]], async (req, res) => {
try {
    const errors = validationResult(req);
    // check is there is errors & return them
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { title , description } = req.body
    const id = uuidv4();

    let results = await pool.query('INSERT INTO pillars (pillar_id, pillar_title, description) VALUES ($1, $2, $3)', [id, title, description])
    res.status(200).json({
        results: results.rows,
        data: {
            pillar_id: id,
            pillar_title: title,
            description
        }
    })

} catch (error) {
  console.log(error.message);
  res.status(500).send({ error:'Server Error'});
}
});



// @route   PUT pillars/:pillar_id
// @desc    Update pillar
// @access  Private
router.put('/:pillar_id', [ auth, [
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
try {
    const errors = validationResult(req);
    // check is there is errors & return them
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { title , description } = req.body
    const pillar_id = req.params.pillar_id

    // cehck if the pillar exists
    const exists = await pool.query('SELECT pillar_id FROM pillars WHERE pillar_id = $1 AND status = true', [pillar_id]);
    console.log(exists.rows.length);
    
    if (exists.rows.length > 0) {
        // update
        let results = await pool.query('UPDATE pillars SET pillar_title = $1, description = $2 WHERE pillar_id = $3', [title, description, pillar_id])
        res.status(200).json({
            msg: "Pillar updated",
            data: {
                pillar_id: pillar_id,
                pillar_title: title,
                description
            }
        })
        
    } else {

        res.status(500).json({
            msg: "invalid pillar id"
        })
    }


} catch (error) {
  console.log(error.message);
  res.status(500).send({ error:'Server Error'});
}
});




// @route   DELETE pillars/:pillar_id
// @desc    Update pillar
// @access  Private
router.delete('/:pillar_id', [ auth, [
    check('pillar_id', 'pillar_id is required')
        .not()
        .isEmpty()
]], async (req, res) => {
try {
    const errors = validationResult(req);
    // check is there is errors & return them
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const pillar_id = req.params.pillar_id

    // cehck if the pillar exists
    const exists = await pool.query('SELECT pillar_id FROM pillars WHERE pillar_id = $1 AND status = true', [pillar_id]);
    console.log(exists.rows.length);
    
    if (exists.rows.length > 0) {
        // update
        let results = await pool.query('UPDATE pillars SET status = false WHERE pillar_id = $1', [pillar_id])
        res.status(200).json({
            msg: "Pillar deleted"
        })
        
    } else {

        res.status(500).json({
            msg: "invalid pillar id"
        })
    }


} catch (error) {
  console.log(error.message);
  res.status(500).send({ error:'Server Error'});
}
});



module.exports = router;
