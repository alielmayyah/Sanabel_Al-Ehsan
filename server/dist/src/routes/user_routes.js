"use strict";
const userController = require("../controllers/userController");
const route = require("express").Router();
route.post("/createaccount", userController.create_user);
route.get("/login", userController.login);
module.exports = route;
