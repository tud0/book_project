const express = require("express");
const bodyParser = require("body-parser");
const path = require("path");
const database = require("./util/database");
const session = require("express-session");
const FileStore = require("session-file-store")(session);
const cookieParser = require("cookie-parser");
const app = express();

//라우터 가져오기
const shopRoutes = require("./routes/shop");
const adminRoutes = require("./routes/admin");
const authRoutes = require("./routes/auth");

//pug 뷰 엔진
app.set("view engine", "pug");
app.set("views", "views");

//body-parser사용
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "public")));
app.use(
  session({ secret: "my secret", resave: false, saveUninitialized: false })
);

database.db;

// app.use(adminRoutes);
app.use(authRoutes);
app.use(shopRoutes);

// db.getConnection();

app.listen(5000);
