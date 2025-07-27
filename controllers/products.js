const Product = require("../Models/product");
const { createCustomError } = require("../errors/custom-error");

async function getProducts(req, res) {
  const allProducts = await Product.find({});
  res.status(200).json(allProducts);
}

async function getProductsQuery(req, res) {
  const { featured, brand, category, name, sort, fields, numericFilters } =
    req.query;
  const queryObject = {};
  if (featured) {
    queryObject.featured = featured === "true";
  }
  if (brand) {
    queryObject.brand = brand;
  }
  if (category) {
    queryObject.category = category;
  }
  if (name) {
    queryObject.name = { $regex: name, $options: "i" };
  }
  if (numericFilters) {
    const operatorMap = {
      ">": "$gt",
      ">=": "$gte",
      "=": "$eq",
      "<": "$lt",
      "<=": "$lte",
    };
    const regEx = /\b(>|>=|=|<|<=)\b/g;

    let filters = numericFilters.replace(
      regEx,
      (match) => `-${operatorMap[match]}-`
    );

    const options = ["priceCents", "rating.stars"];
    filters.split(",").forEach((filter) => {
      const [field, operator, value] = filter.split("-");
      if (options.includes(field)) {
        queryObject[field] = { [operator]: Number(value) };
      }
    });
  }
  let result = Product.find(queryObject);
  if (sort) {
    const sortList = sort.split(",").join(" ");
    result = result.sort(sortList);
  } else {
    result = result.sort("-createdAt _id");
  }
  if (fields) {
    const fieldList = fields.split(",").join(" ");
    result = result.select(fieldList);
  }
  // Check nếu all=true thì bỏ qua limit và skip
  if (req.query.all === "true") {
    const products = await result;
    return res.status(200).json({ nbHits: products.length, products });
  }
  //pagination
  const page = Number(req.query.page) || 1;
  const limit = Number(req.query.limit) || 10;

  const skip = (page - 1) * limit;
  result = result.skip(skip).limit(limit);

  const products = await result;
  res.status(200).json({ nbHits: products.length, products });
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
  getProductsQuery,
  getSingleProducts,
  createProduct,
  updateProduct,
  deleteProduct,
};
