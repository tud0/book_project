const express = require("express");
const router = express.Router();
const path = require("path");
const shopController = require("../controllers/shop");
const shopModel = require("../models/shop");
const orderController = require("../controllers/order");
const cartController = require("../controllers/cart");

router.get("/", shopController.getMain);

router.get("/books", shopController.getBooks);

router.post("/books", shopModel.postBook);

router.get("/book_detail/:data", shopController.getBookDetail);

router.get("/order_history", orderController.getOrderHistory);

router.get("/cart", cartController.getCart);

router.get("/order", orderController.getOrder);

module.exports = router;
