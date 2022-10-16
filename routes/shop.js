const express = require("express");
const router = express.Router();
const path = require("path");
const shopController = require("../controllers/shop");

router.get("/", shopController.getMain);

router.get("/signUp", (req, res) => {
  res.render("signUp", { pageTitle: "signUp" });
});

router.get("/logIn", (req, res) => {
  res.render("logIn");
});

module.exports = router;
