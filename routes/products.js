const express = require('express');
const Category = require('../models/Category');
const Product = require('../models/Product');
const router = express.Router();

// GET all products
router.get('/', async (req, res) => {
  // select fields based on query
  let q = ''
  for (let query in req.query) {
    console.log('query..', query, req.query[query])
    if (req.query[query] === 'true') {
      q += query + ' '
    }
  }

  // inorder to populate category
  let populate = req.query['category'] === 'true' ? 'category' : ''

  try {
    const products = await Product.find({}).select(q).populate(populate);
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
  const category = await Category.findById(req.body.category)
  if (!category) {
    return res.status(400).json({message: 'Invalid Category'})
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

module.exports = router;
