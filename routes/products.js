const express = require("express");
const Product = require("../models/Product");
const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const products = await Product.find({});
    if (!products) {
      return res.status(404).json({ mesage: "no products found" });
    }
    res.status(200).json({ products, message: "success" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

router.post("/", async (req, res) => {
  const product = new Product({ ...req.body });

  try {
    await product.save();
    res.status(201).json({ product, message: "success" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

module.exports = router;
