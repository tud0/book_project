const express = require("express");
const router = express.Router();
const path = require("path");
const shopController = require("../controllers/shop");
const shopModel = require("../models/shop");

router.get("/", shopController.getMain);

router.get("/books", shopController.getBooks);

router.post("/books", shopModel.postBooks);

router.get("/book_detail", shopController.getBookDetail);

module.exports = router;
