const express = require("express");
const usrRoutes = express.Router();
const CRUDS = require("../Controllers/Users");
usrRoutes.route("/all").get(CRUDS.getUsers);
usrRoutes
  .route("/:userId")
  .get(CRUDS.getSingleUser)
  .put(CRUDS.putUser)
  .delete(CRUDS.delUser);

module.exports = { usrRoutes };
