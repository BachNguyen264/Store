require("dotenv").config();
const express = require("express");
const app = express();
const notFound = require("./middlewares/not-found");
const productRouter = require("./routes/products");
const connectDB = require("./Database/connect");
const port = process.env.PORT;
//middleware
app.use(express.json());
//route
app.get("/", (req, res) => {
  res.send("Welcome to my server");
});

app.use("/api/v1/products", productRouter);
app.use(notFound);

async function startServer() {
  try {
    await connectDB(process.env.MONGO_URI);
    console.log("Connected to DB successfully.");
    app.listen(port, () => {
      console.log(`Server is now listening on port ${port}...`);
    });
  } catch (error) {
    console.log(error);
  }
}

startServer();
