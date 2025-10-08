const express = require("express");

const jwt = require("jsonwebtoken");
const router = express.Router();


const JWT_SECRET = "your-jwt-secret-key";

// Middleware specific to this router
router.use((req, res, next) => {
  console.log("Users Router Time:", Date.now());
  next();
});

const { register, login, profile } = require("../controllers/authController");

// เพิ่มข้อมูล User
router.post("/logup", register);

// เข้าสู่ระบบ
router.post("/login", login);

// Middleware for JWT verification
const authenticateJWT = (req, res, next) => {
  // Get auth header - The Authorization header is commonly used to send authentication tokens
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return res.status(401).json({ message: "Authorization header missing" });
  }

  // Extract token from "Bearer <token>"
  const token = authHeader.split(" ")[1];

  if (!token) {
    return res.status(401).json({ message: "Token missing" });
  }

  try {
    // Verify token
    const decoded = jwt.verify(token, JWT_SECRET);

    // Attach user to request
    req.user = decoded;

    next();
  } catch (error) {
    return res.status(403).json({ message: "Invalid or expired token" });
  }
};

// Protected route
router.get("/profile", authenticateJWT, profile);

module.exports = router;
