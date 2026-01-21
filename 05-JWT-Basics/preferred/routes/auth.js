const express = require("express");
const { logon } = require("../controllers/authController");

const router = express.Router();

router.post("/logon", logon);

module.exports = router;
