require("dotenv").config();
const connectDB = require("./db/connect");
const Product = require("./models/product");
const jsonProducts = require("./products.json");

const start = async () => {
  try {
    console.log("MONGO_URI exists:", !!process.env.MONGO_URI);
    console.log("Products in JSON:", jsonProducts.length);

    await connectDB(process.env.MONGO_URI);

    await Product.deleteMany();
    const inserted = await Product.create(jsonProducts);

    console.log("Inserted:", inserted.length);
    process.exit(0);
  } catch (error) {
    console.log("POPULATE ERROR:", error);
    process.exit(1);
  }
};

start();
