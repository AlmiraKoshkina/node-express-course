const mongoose = require("mongoose");
const CustomAPIError = require("../errors/custom-error");

const errorHandlerMiddleware = (err, req, res, next) => {
  // (404 not found)
  if (err instanceof CustomAPIError) {
    return res.status(err.statusCode).json({ error: err.message });
  }

  // (400 bad request)
  if (err instanceof mongoose.Error.CastError) {
    return res.status(400).json({ error: "Invalid task id" });
  }

  if (err instanceof mongoose.Error.ValidationError) {
    return res.status(400).json({ error: err.message });
  }

  return res
    .status(500)
    .json({ error: "Something went wrong, please try again" });
};

module.exports = errorHandlerMiddleware;
