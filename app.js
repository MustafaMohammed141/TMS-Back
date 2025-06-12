const express = require("express");
const server = express();
const cors = require("cors");
const mongoose = require("mongoose");
const { usrRoutes } = require("./Routes/Users");
const { tskRoutes } = require("./Routes/Tasks");
const { authRoutes } = require("./Routes/auth");
require("dotenv").config();
const DB = process.env.DB;
const { checkSign } = require("./MiddleWare/CheckSign");
server.use(cors());
server.use(express.json());

mongoose
  .connect(`${DB}`)
  .then(() => {
    console.log(`DB is online`);
  })
  .catch((err) => {
    console.error("MongoDB Connection Error:", err);
  });

server.use("/users", usrRoutes);
server.use("/tasks", checkSign, tskRoutes);
server.use("/auth", authRoutes);

server.use("/", (req, res) => {
  return res.status(202).json({ status: 202, message: "All good" });
});

module.exports = server;
