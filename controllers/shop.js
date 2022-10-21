const db = require("../util/database");
const adminRoutes = require("../routes/admin");
const express = require("express");
const app = express();
const adminController = require("../controllers/admin");

exports.getMain = (req, res) => {
  res.render("main");
};
