const bcrypt = require("bcrypt");
const saltRounds = 10;
const jwt = require("jsonwebtoken");
const { PrismaClient } = require("../generated/prisma");
const prisma = new PrismaClient();

const { JWT_SECRET } = require("../routes/auth");

const register = async (req, res) => {
  const { email, first_name, last_name, password } = req.body;
  const hash = await bcrypt.hashSync(password, saltRounds);
  try {
    const user = await prisma.user.create({
      data: {
        email: email,
        first_name: first_name,
        last_name: last_name,
        password: hash,
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
};

const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await prisma.user.findUnique({
      where: {
        email: email,
      },
    });

    // เช็ค Email ว่าตรงหรือเปล่า
    if (!user) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    // เช็ค Password ว่าตรงหรือเปล่า
    if (bcrypt.compareSync(password, user.password)) {
      // Create payload for JWT
      const payload = {
        id: user.id,
        username: user.name,
      };

      // Sign token
      const token = jwt.sign(payload, JWT_SECRET, { expiresIn: "1h" });

      res.json({ message: "Login successful", token });
    } else {
      return res.status(401).json({ message: "Invalid credentials" });
    }
  } catch (err) {
    console.error(err);

    res.status(500).json({ message: "Error" });
  }
};

const profile = async (req, res) => {
  res.json({ message: "Profile accessed", user: req.user });
};

module.exports = { register, login, profile };
