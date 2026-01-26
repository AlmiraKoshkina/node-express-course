const jwt = require("jsonwebtoken");

function logon(req, res) {
  const { username } = req.body;

  if (!username || typeof username !== "string") {
    return res.status(400).json({ error: "username is required" });
  }

  const secret = process.env.JWT_SECRET;
  if (!secret) {
    return res.status(500).json({ error: "JWT_SECRET is not configured" });
  }

  const payload = { username };

  const token = jwt.sign(payload, secret, {
    expiresIn: process.env.JWT_EXPIRES_IN || "15m",
  });

  res.status(200).json({ token });
}

module.exports = { logon };
