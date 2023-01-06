const { application } = require("express");
const express = require("express");
const jwt = require("jsonwebtoken");
const { Op } = require("sequelize");
const {Customer, Supplier} = require("../models")
// customer 인증 미들웨어
const jwtCustomer = require("../middlewares/jwt-customer.js");
// supplier 인증 미들웨어
const jwtSupplier = require("../middlewares/jwt-supplier.js");

const router = express.Router();

router.get('/customer/main', jwtCustomer, (req, res) => {
    res.json({message: "고객이 보는 메인페이지 입니다."})
});

router.get('/supplier/main', jwtSupplier, (req, res) => {
    res.json({message: "기업이 보는 메인페이지 입니다."})
});

module.exports = router;