const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const path = require("path");

const mainPage = require("./routes/main");
const signUpPage = require("./routes/signUp");
const logInPage = require("./routes/logIn");
const errorPage = require("./controllers/error");

app.set("view engine", "pug");
app.set("views", "views");

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "public")));

app.use(mainPage);
app.use(signUpPage);
app.use(logInPage);

app.use(errorPage.getErrorPage);

app.listen(8080);
