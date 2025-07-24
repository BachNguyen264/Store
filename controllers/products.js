const Product = require("../Models/product");

async function getProducts(req, res) {
  const allProducts = await Product.find({});
  res.status(200).json(allProducts);
}

async function getSingleProducts(req, res) {
  res.json({ msg: "success" });
}

async function createProduct(req, res) {
  res.json({ msg: "success" });
}

async function updateProduct(req, res) {
  res.json({ msg: "success" });
}

async function deleteProduct(req, res) {
  res.json({ msg: "success" });
}

module.exports = {
  getProducts,
  getSingleProducts,
  createProduct,
  updateProduct,
  deleteProduct,
};
