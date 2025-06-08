const User = require("../Models/Users");
const userschema = require("../Models/Users");
const bcrypt = require("bcrypt");

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

  const user = await userschema({
    name,
    email,
    password: passhash,
  });
  await user.save();
  return res.status(201).json({
    status: 201,
    data: { data: true, message: "Signed up successfully" },
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
  return res.status(201).json({
    status: 201,
    data: { data: "data", message: "Success" },
  });
};
module.exports = { signup, login };
