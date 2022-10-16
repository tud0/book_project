const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const path = require("path");
const db = require("./util/database");

const homePage = require("./routes/shop");

// db.execute('SELECT * FROM products');

app.set("view engine", "pug");
app.set("views", "views");

db.execute("SELECT * FROM book")
  .then((result) => {
    console.log(result[0], result[1]);
  })
  .catch((err) => {
    console.log(err);
  });

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "public")));

app.use(homePage);

app.listen(5000);
