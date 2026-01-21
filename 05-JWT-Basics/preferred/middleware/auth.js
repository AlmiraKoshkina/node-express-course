const jwt = require("jsonwebtoken");

function authenticate(req, res, next) {
  // Read the Authorization header: "Bearer <token>"
  const authHeader = req.headers.authorization;

  // If missing or wrong format, block the request
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res
      .status(401)
      .json({ error: "Authorization header missing or malformed" });
  }

  // Extract the token part after "Bearer "
  const token = authHeader.split(" ")[1];

  try {
    // Verify signature + expiry using the server secret
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Make decoded payload available to next handlers
    req.user = decoded;

    // Continue to the next middleware/route handler
    next();
  } catch (err) {
    // Token is invalid or expired
    return res.status(401).json({ error: "Invalid or expired token" });
  }
}

module.exports = { authenticate };
