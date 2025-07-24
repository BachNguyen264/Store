require("dotenv").config();
const connectDB = require("../Database/connect");
const productsJson = require("../products.json");
const Product = require("../Models/product");

async function start() {
  try {
    await connectDB(process.env.MONGO_URI);
    console.log("Connect to DB successfully.");
    await Product.deleteMany();
    await Product.insertMany(productsJson);
    console.log("Populate DB successfully.");
    process.exit(0);
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
}

start();
