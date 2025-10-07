const express = require("express");
const cors = require("cors");
const usersRouter = require("./routes/users");
const authRouter = require("./routes/auth");

const app = express();
const port = 8080;

// ใช้ CORS middleware แบบอนุญาตทั้งหมด
app.use(cors());

// Middleware to parse JSON request bodies
app.use(express.json());

// Middleware to parse URL-encoded request bodies
app.use(express.urlencoded({ extended: true }));

// Middleware to serve static files from a directory
app.use(express.static("public"));

// Use the routers
app.use("/api/users", usersRouter);
app.use("/api/auth", authRouter);

// Define a route for GET requests to the root URL
app.get("/", (req, res) => {
  res.send("Hello World from Express!");
});

// Start the server
app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
