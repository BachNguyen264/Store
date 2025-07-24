const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Product name must be provided"],
  },
  priceCents: {
    type: Number,
    required: [true, "product price must be provided"],
  },
  createAt: {
    type: Date,
    default: Date.now(),
  },
  rating: {
    stars: {
      type: Number,
      default: 4.5,
      max: [5, "Rating cannot be over 5"],
    },
    count: {
      type: Number,
      default: 100,
    },
  },
  image: {
    type: String,
  },
});

const Product = mongoose.model("Product", productSchema);

module.exports = Product;
