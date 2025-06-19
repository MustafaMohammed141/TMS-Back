const express = require("express");
const authRoutes = express.Router();
const CRUDS = require("../Controllers/auth");

authRoutes.route("/signup").post(CRUDS.signup);
authRoutes.route("/login").post(CRUDS.login);
module.exports = { authRoutes };
