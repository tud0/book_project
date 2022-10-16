const Product = require("../models/product");

exports.getMain = (req, res, next) => {
  Product.fetchAll()
    .then(([rows, fieldData]) => {
      res.render("/main", {
        prods: rows,
        pageTitle: "MainPage",
        path: "/",
      });
    })
    .catch((err) => console.log(err));
};
