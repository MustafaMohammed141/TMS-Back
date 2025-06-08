const User = require("../Models/Users");

const getAllTasks = async (req, res) => {
  const { userId } = req.params;
  try {
    const singleUser = await User.findById(userId);
    if (!singleUser) {
      return res.status(404).json({
        status: 404,
        data: { data: null, message: "User is not found" },
      });
    }
    const tasks = singleUser.tasks;

    return res.status(200).json({
      status: 200,
      data: { data: tasks, message: "tasks fetched" },
    });
  } catch (err) {
    return res.status(500).json({
      status: 500,
      data: { data: null, message: err.message },
    });
  }
};
const getSingleTask = async (req, res) => {
  const { userId, taskId } = req.params;

  try {
    const singleUser = await User.findById(userId);
    if (!singleUser) {
      return res.status(404).json({
        status: 404,
        data: { data: null, message: "User is not found" },
      });
    }
    const singleTask = singleUser.tasks.id(taskId);
    if (!singleTask) {
      return res.status(404).json({
        status: 404,
        data: { data: null, message: "Task not found" },
      });
    }
    return res.status(200).json({
      status: 200,
      data: { data: singleTask, message: "One task fethced" },
    });
  } catch (err) {
    return res.status(500).json({
      status: 500,
      data: { data: null, message: err.message },
    });
  }
};
const createTask = async (req, res) => {
  const { userId } = req.params;
  const { title, content, category, status } = req.body;

  try {
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({
        status: 404,
        data: { data: null, message: "User not found" },
      });
    }

    const newTask = {
      title,
      content,
      category,
      status,
    };

    user.tasks.push(newTask);
    await user.save();

    return res.status(201).json({
      status: 201,
      data: {
        data: user.tasks[user.tasks.length - 1],
        message: "Task created",
      },
    });
  } catch (err) {
    return res.status(500).json({
      status: 500,
      data: { data: null, message: err.message },
    });
  }
};

const updateTask = async (req, res) => {
  const { userId, taskId } = req.params;
  const { title, content, category, status } = req.body;

  try {
    const user = await User.findById(userId);
    if (!user) {
      return res
        .status(404)
        .json({ status: 404, data: { data: null, message: "User not found" } });
    }

    const task = user.tasks.id(taskId);
    if (!task) {
      return res
        .status(404)
        .json({ status: 404, data: { data: null, message: "Task not found" } });
    }

    // update fields if sent
    if (title !== undefined) task.title = title;
    if (content !== undefined) task.content = content;
    if (category !== undefined) task.category = category;
    if (status !== undefined) task.status = status;

    await user.save();

    return res.status(200).json({
      status: 200,
      data: { data: task, message: "Task updated" },
    });
  } catch (err) {
    return res
      .status(500)
      .json({ status: 500, data: { data: null, message: err.message } });
  }
};

const deleteTask = async (req, res) => {
  const { userId, taskId } = req.params;

  try {
    const user = await User.findById(userId);
    if (!user) {
      return res
        .status(404)
        .json({ status: 404, data: { data: null, message: "User not found" } });
    }

    const task = user.tasks.id(taskId);
    if (!task) {
      return res
        .status(404)
        .json({ status: 404, data: { data: null, message: "Task not found" } });
    }

    task.remove(); // أو user.tasks.pull(task._id);
    await user.save();

    return res.status(200).json({
      status: 200,
      data: { data: null, message: "Task deleted" },
    });
  } catch (err) {
    return res
      .status(500)
      .json({ status: 500, data: { data: null, message: err.message } });
  }
};
module.exports = {
  getAllTasks,
  getSingleTask,
  createTask,
  updateTask,
  deleteTask,
};
