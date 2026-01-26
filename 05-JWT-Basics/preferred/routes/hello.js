const express = require("express");
const { sayHello } = require("../controllers/helloController");
const { authenticate } = require("../middleware/auth");

const router = express.Router();

router.get("/hello", authenticate, sayHello);

module.exports = router;
