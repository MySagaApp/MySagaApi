const express = require("express");
const { signup, signin } = require("../controllers/userController");
const userRoutes = express.Router();

userRoutes.post("/signup",signup);

userRoutes.post("/signin",signin);

module.exports=userRoutes;