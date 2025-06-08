const express = require("express");
const tskRoutes = express.Router();
const CRUDS = require("../Controllers/Tasks");

tskRoutes.route("/:userId/").get(CRUDS.getAllTasks).post(CRUDS.createTask);
tskRoutes
  .route("/:userId/:taskId")
  .get(CRUDS.getSingleTask)
  .put(CRUDS.updateTask)
  .delete(CRUDS.deleteTask);

module.exports = { tskRoutes };
