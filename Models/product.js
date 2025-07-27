const mongoose = require("mongoose");

const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Product name must be provided"],
    },
    priceCents: {
      type: Number,
      required: [true, "Product price must be provided"],
    },
    image: {
      type: String,
      required: [true, "Product image must be provided"],
    },
    brand: {
      type: String,
      required: [true, "Brand must be provided"],
    },
    category: {
      type: String,
      required: [true, "Category must be provided"],
    },
    description: {
      type: String,
      required: [true, "Description must be provided"],
    },
    stock: {
      type: Number,
      default: 0,
      min: [0, "Stock cannot be negative"],
    },
    featured: {
      type: Boolean,
      default: false,
    },
    rating: {
      stars: {
        type: Number,
        default: 4.5,
        min: [0, "Rating cannot be below 0"],
        max: [5, "Rating cannot be over 5"],
      },
      count: {
        type: Number,
        default: 100,
      },
    },
  },
  {
    timestamps: true, //createdAt & updatedAt
  }
);

const Product = mongoose.model("Product", productSchema);

module.exports = Product;
