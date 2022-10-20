const express = require("express");
const router = express.Router();
const path = require("path");
const shopController = require("../controllers/shop");

router.get("/", shopController.getMain);

module.exports = router;
