const mongoose = require('mongoose');
const { Schema } = mongoose;

const productSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
      minlength: 5,
      maxlength: 100,
    },
    description: {
      type: String,
      required: true,
    },
    richDescription: {
      type: String,
      default: '',
    },
    image: {
      type: String,
      required: true,
      trim: true,
      default: '',
    },
    images: [
      {
        type: String,
      },
    ],
    brand: {
      type: String,
      default: '',
    },
    price: {
      type: String,
      default: 0,
    },
    category: {
      type: Schema.Types.ObjectId,
      ref: 'Category',
      required: true,
    },
    countInStock: {
      type: Number,
      required: true,
      min: 0,
      max: 500,
    },
    rating: {
      type: Number,
      default: 0,
    },
    numReviews: {
      type: Number,
      default: 0,
    },
    isFeatured: {
      type: Boolean,
      default: false,
    },
    // dateCreated: {
    //   type: Date,
    //   default: Date.now,
    // },
  },
  {
    timestamps: true,
  }
);

const Product = mongoose.model('Product', productSchema);

module.exports = Product;
