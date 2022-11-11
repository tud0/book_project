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
const userRoutes = require("./routes/user");

//pug 뷰 엔진
app.set("view engine", "ejs");
app.set("views", "views");
//db
database.db;

//body-parser사용
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "public")));

//쿠키와 세션 사용
app.use(cookieParser());
app.use(
  session({
    secret: "book online store", //암호화
    resave: false, //세션을 항상 저장할지 여부
    saveUninitialized: true, //  초기화되지 않은 채 스토어에 저장되는 세션
    store: new FileStore(),
    cookie: {
      httpOnly: true,
      secure: false,
    },
  })
);

app.use(adminRoutes);
app.use(shopRoutes);
app.use(userRoutes);

// db.getConnection();

app.listen(5000);
