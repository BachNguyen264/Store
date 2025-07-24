const express = require("express");
const productRouter = express.Router();
const {
  getProducts,
  getSingleProducts,
  createProduct,
  updateProduct,
  deleteProduct,
} = require("../controllers/products");

productRouter.route("/").get(getProducts).post(createProduct);
productRouter
  .route("/:id")
  .get(getSingleProducts)
  .patch(updateProduct)
  .delete(deleteProduct);

module.exports = productRouter;
