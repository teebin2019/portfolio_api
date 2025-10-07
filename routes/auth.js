const express = require("express");
const jwt = require("jsonwebtoken");
const router = express.Router();
const { PrismaClient } = require("../generated/prisma");
const prisma = new PrismaClient();

const JWT_SECRET = "your-jwt-secret-key";

// Middleware specific to this router
router.use((req, res, next) => {
  console.log("Users Router Time:", Date.now());
  next();
});

// เพิ่มข้อมูล User
router.post("/login", async (req, res) => {
  const { email, name } = req.body;
  try {
    const user = await prisma.user.create({
      data: {
        email: email,
        name: name,
      },
    });
    res.status(200).json({ message: "User Created Successfully", user: user });
  } catch (err) {
    console.error(err);
    if (err.code === "P2002") {
      res.status(409).json({ message: "อีเมลซ้ำ" });
    }
    res.status(500).json({ message: "Error" });
  }
});

module.exports = router;
