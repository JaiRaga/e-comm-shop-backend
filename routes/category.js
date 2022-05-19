const express = require('express');
const Category = require('../models/Category');
const router = express.Router();

// GET all categories
router.get('/', async (req, res) => {
  try {
    const category = await Category.find();
    if (!category) {
      return res.status(404).json({ message: 'failure' });
    }
    res.status(200).json({ category, message: 'success' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'failure', error: err.errors });
  }
});

// GET category by id
router.get('/:id', async (req, res) => {
  try {
    const category = await Category.findById(req.params.id);
    if (!category) {
      return res.status(404).json({ message: 'failure' });
    }
    res.status(200).json({ category, message: 'success' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'failure', error: err });
  }
});

// Create a category
router.post('/', async (req, res) => {
  try {
    const category = new Category({ ...req.body });
    await category.save();
    res.status(201).json({ category, message: 'success' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'failure', error: err.errors });
  }
});

// Update a category
router.put('/:id', async (req, res) => {
  try {
    const category = await Category.findByIdAndUpdate(
      req.params.id,
      {
        ...req.body,
      },
      { new: true }
    );
    if (!category) {
      return res.status(404).json({ message: 'failure' });
    }

    res.status(200).json({ category, message: 'success' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'failure', error: err.errors });
  }
});

// DELETE a category
router.delete('/:id', async (req, res) => {
  try {
    const category = await Category.findByIdAndDelete(req.params.id);
    if (!category) {
      return res.status(404).json({ message: 'failure' });
    }
    res.status(204).json({ category, message: 'success' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'failure', error: err.errors });
  }
});

module.exports = router;
