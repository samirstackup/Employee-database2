const express = require("express");
const route = express.Router();
const multer = require("multer");
const path = require("path"); // Import the 'path' module
var auth = require("../controller/auth");
const { isAuth } = require("../services/authenticate");

const services = require("../services/render");
const controller = require("../controller/controller");
const authController = require("../controller/authController"); //Importing the auth controller\
const authenticate = require("../services/authenticate");

// Registration and login routes (no authentication needed)
route.post("/register", authController.register);
route.post("/login", authController.login);
route.post("/refreshtoken", authController.refreshtoken);

// Template engine routes (protected by authentication)
// route.get("/", authenticate, services.homeRoute);
// Protected route
route.get("/", isAuth, services.homeRoute);
route.get("/empdetails/:id", isAuth, services.editEmp);

// API routes (protected by authentication)
route.post("/api/employees", controller.create);
route.get("/api/employees", controller.find);
route.put("/api/employees/:id", controller.update);
route.delete("/api/employees/:id", controller.delete);

// route.post(
//   "/api/employees?id=:id/avatar",

//   // controller.uploadAvatar
// );

// Public routes for rendering login and registration pages (no authentication needed)
route.get("/login", services.login);
route.get("/register", services.register);
route.get("/logout", services.logout);

module.exports = route;
