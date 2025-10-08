const { PrismaClient } = require("../generated/prisma");
const prisma = new PrismaClient();

const getUsers = async (req, res) => {
  try {
    const allUsers = await prisma.user.findMany();
    res
      .status(200)
      .json({ message: "User Select Successfully", users: allUsers });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error" });
  }
};

const getUserById = async (req, res) => {
  const id = req.params.id;
  try {
    const user = await prisma.user.findUnique({
      where: {
        id: Number(id),
      },
    });
    res.status(200).json({ message: "User Select Successfully", user: user });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error" });
  }
};

const updateUser = async (req, res) => {
  const id = req.params.id;
  const { email, name } = req.body;
  try {
    const updateUser = await prisma.user.update({
      where: {
        id: Number(id),
      },
      data: {
        email: email,
        name: name,
      },
    });
    res
      .status(200)
      .json({ message: "User Update Successfully", user: updateUser });
  } catch (err) {
    console.error(err);
    if (err.code === "P2002") {
      res.status(409).json({ message: "อีเมลซ้ำ" });
    }
    res.status(500).json({ message: "Error" });
  }
};

const deleteUser = async (req, res) => {
  const id = req.params.id;
  try {
    const deleteUser = await prisma.user.delete({
      where: {
        id: Number(id),
      },
    });
    res
      .status(200)
      .json({ message: "User Delete Successfully", user: deleteUser });
  } catch (err) {
    console.error(err);
    if (err.code === "P2025") {
      res.status(409).json({ message: err.meta.cause });
    }
    res.status(500).json({ message: "Error" });
  }
};

module.exports = { getUsers, getUserById, updateUser, deleteUser };
