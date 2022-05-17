const express = require("express");
const router = express.Router();

const products = [
  { id: 1, name: "comb", image: "img.url" },
  { id: 2, name: "brush", image: "img.url" },
];

router.get("/", (req, res) => {
  res.send(products);
});

router.post("/", (req, res) => {
  const newProduct = req.body;
  console.log(newProduct);
  products.unshift(newProduct)
  res.send(products);
});

module.exports = router;
