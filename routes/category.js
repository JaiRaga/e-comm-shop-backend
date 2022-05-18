const express = require('express');
const Category = require('../models/Category')
const router = express.Router();

router.get('/', async (req, res) => {
  try {
    const category = await Category.find()
    if (!category) {
      return res.status(404).json({message: 'failure'})
    }
    res.status(200).json({category, message: 'success'})
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'failure' });
  }
});


module.exports = router;
