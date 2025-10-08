const express = require("express");

const router = express.Router();

const JWT_SECRET = "your-jwt-secret-key";
exports.JWT_SECRET = JWT_SECRET;

// Middleware specific to this router
router.use((req, res, next) => {
  console.log("Users Router Time:", Date.now());
  next();
});

const { register, login, profile } = require("../controllers/authController");
const { authenticateJWT } = require("../middleware/authenticateJWT");

// เพิ่มข้อมูล User
router.post("/logup", register);

// เข้าสู่ระบบ
router.post("/login", login);

// Protected route
router.get("/profile", authenticateJWT, profile);

module.exports = router;
