const express = require("express");

const authController = require("../controllers/auth");
const userModel = require("../models/user");

const router = express.Router();

router.get("/logIn", authController.getLogin);

router.post("/logIn", userModel.postLogin);

router.get("/signUp", authController.getSignUp);

router.post("/signUp", userModel.postSignUp);

module.exports = router;
