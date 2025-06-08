const User = require("../Models/Users");

const getUsers = async (req, res) => {
  try {
    const users = await User.find({});
    res.status(200).json({
      status: 200,
      data: { data: users, message: "All fetched" },
    });
  } catch (err) {
    res.status(500).json({ status: 500, message: err.message });
  }
};
const getSingleUser = async (req, res) => {
  const { userId } = req.params;
  try {
    const singleUser = await User.findById(userId);
    if (!singleUser) {
      return res.status(404).json({
        status: 404,
        data: { data: null, message: "Invalid user ID" },
      });
    }
    return res.status(200).json({
      status: 200,
      data: { data: singleUser, message: "One fethced" },
    });
  } catch (err) {
    return res.status(500).json({
      status: 500,
      data: { data: null, message: err.message },
    });
  }
};

const putUser = async (req, res) => {
  try {
    const { userId } = req.params;
    User.updateOne({ _id: userId }, { $set: req.body });
    res.status(200).json({
      status: 200,
      message: "User updated successfully",
    });
  } catch (err) {
    res.status(500).json({
      status: 500,
      data: { data: null, message: err.message },
    });
  }
};
const delUser = async (req, res) => {
  try {
    const { userId } = req.params;
    await User.deleteOne({ _id: userId });
    res.status(200).json({
      status: 200,
      message: "User deleted successfully",
    });
  } catch (err) {
    res.status(500).json({
      status: 500,
      data: { data: null, message: err.message },
    });
  }
};
module.exports = {
  getUsers,
  getSingleUser,
  putUser,
  delUser,
};
