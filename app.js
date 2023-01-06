const express = require("express");
const { Op } = require("sequelize");
const jwt = require("jsonwebtoken");
const cookieParser = require("cookie-parser");

const app = express();
const router = express.Router();

const loginRouter = require("./routes/login");
const signupRouter = require("./routes/signup");
const profileRouter = require("./routes/profile");
const laundryRouter = require("./routes/laundry");
const mainRouter = require("./routes/main");
const reviewRouter = require("./routes/review");

app.use(express.json());
app.use(cookieParser());
app.use("/api", [
  loginRouter,
  signupRouter,
  profileRouter,
  laundryRouter,
  mainRouter,
  reviewRouter,
]);
app.use("/api", express.urlencoded({ extended: false }), router);
app.use(express.static("assets"));

// 초기페이지
app.get("/", (req, res) => {
  res.sendFile(__dirname + "/assets/main.html");
});

app.listen(3000, () => {
  console.log("서버가 요청을 받을 준비가 됐어요");
});
