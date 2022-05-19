const express = require('express');
const mongoose = require('mongoose');
const Category = require('../models/Category');
const Product = require('../models/Product');
const router = express.Router();

// GET all products
router.get('/', async (req, res) => {
  // select fields based on query
  let q = '';
  for (let query in req.query) {
    console.log('query..', query, req.query[query]);
    if (req.query[query] === 'true') {
      q += query + ' ';
    }
  }
  // inorder to populate category
  let populate = req.query['category'] === 'true' ? 'category' : '';

  // get categories from query params and filter only the categories based on the categories id passed
  let filter = {};
  if (req.query.category) {
    filter = { category: req.query.category.split(',') };
  }

  try {
    const products = await Product.find(filter).select(q).populate(populate);
    if (!products) {
      return res.status(404).json({ mesage: 'no products found' });
    }
    res.status(200).json({ products, message: 'success' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'failure' });
  }
});

// GET product by id
router.get('/:id', async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) {
      return res.status(404).json({ mesage: 'no product found' });
    }
    res.status(200).json({ product, message: 'success' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'failure' });
  }
});

// POST a product
router.post('/', async (req, res) => {
  // To check if the category in the body of the request is a valid category
  const category = await Category.findById(req.body.category);
  if (!category) {
    return res.status(400).json({ message: 'Invalid Category' });
  }

  const product = new Product({ ...req.body });

  try {
    await product.save();
    res.status(201).json({ product, message: 'success' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'failure', error: err.errors });
  }
});

// Update a product
router.put('/:id', async (req, res) => {
  // Checks if the product id is valid
  console.log(mongoose.isValidObjectId(req.params.id));
  if (!mongoose.isValidObjectId(req.params.id)) {
    return res.status(400).json({ message: 'Invalid Product id' });
  }

  // To check if the category in the body of the request is a valid category
  const category = await Category.findById(req.body.category);
  if (!category) {
    return res.status(400).json({ message: 'Invalid Category' });
  }

  try {
    const product = await Product.findByIdAndUpdate(
      req.params.id,
      {
        ...req.body,
      },
      { new: true }
    );
    if (!product) {
      return res.status(404).json({ message: 'failure' });
    }

    res.status(200).json({ product, message: 'success' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'failure', error: err.errors });
  }
});

// DELETE a category
router.delete('/:id', async (req, res) => {
  try {
    const product = await Product.findByIdAndDelete(req.params.id);
    if (!product) {
      return res.status(404).json({ message: 'failure' });
    }
    res.status(204).json({ product, message: 'success' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'failure', error: err.errors });
  }
});

// count the number of products
router.get('/get/count', async (req, res) => {
  try {
    const productCount = await Product.countDocuments();
    if (!productCount) {
      return res.status(404).json({ mesage: 'no products found' });
    }
    res.status(200).json({ productCount, message: 'success' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'failure' });
  }
});

// Get the featured products
router.get('/get/featured/:count', async (req, res) => {
  const count = req.params.count ? req.params.count : 0;
  try {
    const products = await Product.find({ isFeatured: true }).limit(count);
    if (!products) {
      return res.status(404).json({ mesage: 'no products found' });
    }
    res.status(200).json({ products, message: 'success' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'failure' });
  }
});

module.exports = router;
