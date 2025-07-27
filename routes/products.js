const express = require("express");
const productRouter = express.Router();
const asyncWrapper = require("../utils/asyncWrapper");
const {
  getProducts,
  getProductsQuery,
  getSingleProducts,
  createProduct,
  updateProduct,
  deleteProduct,
} = require("../controllers/products");

productRouter
  .route("/")
  .get(asyncWrapper(getProductsQuery))
  .post(asyncWrapper(createProduct));
productRouter
  .route("/:id")
  .get(asyncWrapper(getSingleProducts))
  .patch(asyncWrapper(updateProduct))
  .delete(asyncWrapper(deleteProduct));

module.exports = productRouter;
