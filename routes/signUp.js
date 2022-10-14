const express = require("express");
const router = express.Router();
const path = require("path");

router.get("/signUp", (req, res) => {
  res.render("signUp", { pageTitle: "signUp" });
});

module.exports = router;
