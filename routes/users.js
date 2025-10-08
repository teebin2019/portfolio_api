const express = require("express");

const router = express.Router();

// Middleware specific to this router
router.use((req, res, next) => {
  console.log("Users Router Time:", Date.now());
  next();
});

const {
  getUsers,
  getUserById,
  updateUser,
  deleteUser,
} = require("../controllers/userController");

// ข้อมูล User
router.get("/", getUsers);

// ข้อมูล User จาก id
router.get("/:id", getUserById);

// แก้ไขข้อมูล User
router.put("/:id", updateUser);

// ลบข้อมูล User
router.delete("/:id", deleteUser);

module.exports = router;
