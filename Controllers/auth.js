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
  const user = await User.create({ name, email, password: passhash });
  const enc = jwt.sign({ name }, TOKEN_KEY);
  res
    .setHeader(`Authorization`, `Bearer ${enc}`)
    .setHeader("Access-Control-Expose-Headers", "Authorization")
    .cookie("token", enc, {
      httpOnly: true,
      secure: false,
      sameSite: "",
      maxAge: 1000 * 60 * 60 * 24 * 30,
    });
  return res.status(202).json({
    status: 202,
    message: "signed up",
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
  res
    .setHeader(`Authorization`, `Bearer ${enc}`)
    .setHeader("Access-Control-Expose-Headers", "Authorization")
    .cookie("token", enc, {
      httpOnly: true,
      secure: false,
      sameSite: "",
      maxAge: 1000 * 60 * 60 * 24 * 30,
    });
  return res.status(202).json({
    status: 202,
    message: "Logged in",
  });
};
module.exports = { signup, login };
