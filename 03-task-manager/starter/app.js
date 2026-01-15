const express = require("express");
const mongoose = require("mongoose");
require("dotenv").config();

const app = express();

const tasksRouter = require("./routers/tasks");
const errorHandlerMiddleware = require("./middleware/error-handler");

app.use(express.json());
app.use(express.static("./public"));

app.get("/hello", (req, res) => {
  res.send("Task Manager App");
});

// routes
app.use("/api/v1/tasks", tasksRouter);

// error handler
app.use(errorHandlerMiddleware);

const PORT = process.env.PORT || 3000;

const start = async () => {
  try {
    if (!process.env.MONGO_URI) {
      throw new Error("MONGO_URI is missing in .env");
    }

    await mongoose.connect(process.env.MONGO_URI);

    console.log("Connected to MongoDB");

    app.listen(PORT, () => {
      console.log(`Server listening on port ${PORT}`);
    });
  } catch (err) {
    console.error("Startup error:", err.message);
    process.exit(1);
  }
};

start();
