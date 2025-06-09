const express = require("express");
const server = express();
const cors = require("cors");
const jwt = require("jsonwebtoken");
const mongoose = require("mongoose");
const { usrRoutes } = require("./Routes/Users");
const { tskRoutes } = require("./Routes/Tasks");
const { authRoutes } = require("./Routes/auth");
const autoIn = express.Router();
require("dotenv").config();
const DB = process.env.DB;
const TOKEN_KEY = process.env.TOKEN_KEY;

server.use(cors());
server.use(express.json());

mongoose
  .connect(DB)
  .then(() => {
    console.log(`DB is online`);
  })
  .catch((err) => {
    console.error("MongoDB Connection Error:", err);
  });

// Middleware
const checkSign = (req, res, next) => {
  const auth = req.get("Authorization");
  if (!auth || !auth.startsWith("Bearer ")) {
    return res.status(401).json({ error: "No token provided" });
  }
  const token = auth.slice(7);
  try {
    const verify = jwt.verify(token, TOKEN_KEY);
    req.user = verify;
    next();
  } catch (err) {
    return res.status(401).json({ error: "Invalid token" });
  }
};

server.use("/", checkSign, (req, res) => {
  return res.status(202).json({ status: 202, message: "All good" });
});
// server.use("/users", usrRoutes);
server.use("/tasks", checkSign, tskRoutes);
server.use("/auth", authRoutes);

server.listen(3000, () => {
  console.log(`Online`);
});
