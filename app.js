const express = require("express");
const server = express();
const cors = require("cors");
const mongoose = require("mongoose");
const cookie = require("cookie-parser");
const { usrRoutes } = require("./Routes/Users");
const { tskRoutes } = require("./Routes/Tasks");
const { authRoutes } = require("./Routes/auth");
const DB = process.env.DB;
const { checkSign } = require("./MiddleWare/CheckSign");

require("dotenv").config();

const allowedOrigins = ["http://localhost:5173"];

server.use(
  cors({
    origin: function (origin, callback) {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    credentials: true,
  })
);
server.use(cookie());
server.use(express.json());

mongoose
  .connect(DB)
  .then(() => {
    console.log(`DB is online`);
  })
  .catch((err) => {
    console.error("MongoDB Connection Error:", err);
  });

server.use("/users", usrRoutes);
server.use("/tasks", checkSign, tskRoutes);
server.use("/auth", authRoutes);
server.use("/isLogged", (req, res) => {
  const token = req.cookies.token;
  if (!token) {
    return res
      .status(200)
      .json({ logged: false, message: "no token provided" });
  }

 
  try {
    const decoded = jwt.verify(token, process.env.TOKEN_KEY);
    console.log("Decoded:", decoded);   // ✅
    return res.status(200).json({ logged: true });
  } catch (err) {
    console.error("JWT Error:", err);   // ✅
    return res.status(403).json({ logged: false, message: "Invalid token" });
  }
});

server.use("/", (req, res) => {
  return res.status(202).json({ status: 202, message: "All good" });
});

module.exports = server;
