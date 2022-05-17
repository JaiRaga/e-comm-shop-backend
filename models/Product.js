const mongoose = require("mongoose");
const { Schema } = mongoose;

const productSchema = new Schema({
  name: {
    type: String,
    required: true,
    trim: true,
    minlength: 5,
    maxlength: 100,
  },
  image: {
    type: String,
    required: true,
    trim: true,
  },
  countInStock: {
    type: Number,
    default: 1,
  },
});

const Product = mongoose.model("Product", productSchema);

module.exports = Product;
