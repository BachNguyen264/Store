const Product = require("../Models/product");
const { createCustomError } = require("../errors/custom-error");

async function getProducts(req, res) {
  const allProducts = await Product.find({});
  res.status(200).json(allProducts);
}

async function getSingleProducts(req, res) {
  const { id: productId } = req.params;
  const product = await Product.findById(productId);
  if (!product) {
    throw createCustomError(`No product with id : ${productId}`, 404);
  }
  res.status(200).json(product);
}

async function createProduct(req, res) {
  const product = await Product.create(req.body);
  res.status(201).json(product);
}

async function updateProduct(req, res) {
  const { id: productId } = req.params;
  const product = await Product.findByIdAndUpdate(productId, req.body, {
    returnDocument: "after",
    runValidators: true,
  });
  if (!product) {
    throw createCustomError(`No product with id : ${productId}`, 404);
  }
  res.status(200).json(product);
}

async function deleteProduct(req, res) {
  const { id: productId } = req.params;
  const product = await Product.findByIdAndDelete(productId);
  if (!product) {
    throw createCustomError(`No product with id : ${productId}`, 404);
  }
  res.status(200).json({ msg: "Delete successfully." });
}

module.exports = {
  getProducts,
  getSingleProducts,
  createProduct,
  updateProduct,
  deleteProduct,
};
