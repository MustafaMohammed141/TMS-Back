const User = require("../Models/Users");
const userschema = require("../Models/Users");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv").config();

const TOKEN_KEY = process.env.TOKEN_KEY;
const signup = async (req, res) => {
  const { name, email, password } = req.body;
  if (!name || !email || !password)
    return res
      .status(400)
      .json({ status: 400, data: { data: null, message: "missing data" } });

  const isUser = await User.findOne({ email });
  if (isUser)
    return res
      .status(400)
      .json({ status: 400, data: { data: null, message: "Existing User" } });
  const passhash = await bcrypt.hash(password, 8);
  const data = { name, email, password: passhash };
  const user = await userschema(data);
  await user.save();
  return res.status(201).json({
    status: 201,
    message: "Signed up",
  });
};

const login = async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password)
    return res.status(400).json({
      status: 400,
      data: { data: null, message: "missing data" },
    });
  const isUser = await User.findOne({ email });
  if (!isUser)
    return res.status(400).json({
      status: 400,
      data: { data: null, message: "Recheck your data" },
    });
  const isPass = await bcrypt.compare(password, isUser.password);
  if (!isPass)
    return res.status(400).json({
      status: 400,
      data: { data: null, message: "Recheck your data" },
    });
  const id = isUser._id;
  const enc = jwt.sign({ id }, TOKEN_KEY);
  return res.setHeader(`Authorization`, `Bearer ${enc}`).status(202).json({
    status: 202,
    message: "Logged in",
  });
};
module.exports = { signup, login };
