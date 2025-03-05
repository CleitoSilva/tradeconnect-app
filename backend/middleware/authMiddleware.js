const jwt = require("jsonwebtoken");
const User = require("../models/User");

const protect = async (req, res, next) => {
  let token;
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    try {
      token = req.headers.authorization.split(" ")[1];
      console.log("✅ Token received:", token);

      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      console.log("✅ Decoded token:", decoded);

      req.user = await User.findById(decoded.id).select("-password");
      console.log("✅ Authenticated user:", req.user);

      if (!req.user) {
        return res.status(401).json({ message: "User not found." });
      }

      next();
    } catch (error) {
      console.error("❌ Auth error:", error.message);
      res.status(401).json({ message: "Not authorized, token failed" });
    }
  } else {
    res.status(401).json({ message: "Not authorized, no token" });
  }
};

module.exports = { protect };
