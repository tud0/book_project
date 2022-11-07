const express = require("express");
const router = express.Router();

const authController = require("../controllers/user");
const userModel = require("../models/user");

router.get("/logIn", authController.getLogin);

router.post("/logIn", userModel.postLogin);

router.get("/signUp", authController.getSignUp);

router.post("/signUp", userModel.postSignUp);

router.get("/logout", authController.getLogout);

module.exports = router;
