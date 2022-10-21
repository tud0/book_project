const express = require("express");
const router = express.Router();

const adminController = require("../controllers/admin");
const adminModel = require("../models/admin");

router.get("/admin", adminController.getAdmin);

router.get("/products", adminController.getProducts);

router.post("/products", adminModel.postProducts);

module.exports = router;
