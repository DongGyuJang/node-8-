const express = require("express");
const jwt = require("jsonwebtoken");
const { Op } = require("sequelize");
const { Customer, Supplier } = require("../models");
// const jwtMiddleware = require("../middlewares/jwt-middleware.js");

const router = express.Router();

// Customer 회원가입
router.post("/signup/customer", async (req, res) => {
  try {
    const { nickname, email, password, confirmPassword, cellPhone } = req.body;
    if (password !== confirmPassword) {
      res.status(400).send({
        errorMessage: "패스워드가 패스워드 확인란과 동일하지 않습니다.",
      });
      return;
    }

    const existCustomer = await Customer.findAll({
      where: {
        [Op.or]: [{ email: email }, { nickname: nickname }],
      },
    });

    if (existCustomer.length > 0) {
      res.status(400).json({
        errorMessage: "Email이나 Nickname이 이미 사용 중입니다.",
      });
      return;
    }

    const customer = new Customer({
      nickname,
      email,
      password,
      confirmPassword,
      cellPhone,
    });
    await customer.save();

    res.status(201).send({ message: "회원 가입에 성공하였습니다." });
  } catch (error) {
    console.error(error);
    res.status(500).json({ errorMessage: error.Message });
  }
});

// Supplier 회원가입
router.post("/signup/supplier", async (req, res) => {
  try {
    const { nickname, email, password, confirmPassword, cellPhone } = req.body;
    if (password !== confirmPassword) {
      res.status(400).send({
        errorMessage: "패스워드가 패스워드 확인란과 동일하지 않습니다.",
      });
      return;
    }

    const existSupplier = await Customer.findAll({
      where: {
        [Op.or]: [{ email: email }, { nickname: nickname }],
      },
    });

    if (existSupplier.length > 0) {
      res.status(400).json({
        errorMessage: "Email이나 Nickname이 이미 사용 중입니다.",
      });
      return;
    }

    const supplier = new Supplier({
      nickname,
      email,
      password,
      confirmPassword,
      cellPhone,
    });
    await supplier.save();

    res.status(201).send({ message: "회원 가입에 성공하였습니다." });
  } catch (error) {
    console.error(error);
    res.status(500).json({ errorMessage: error.Message });
  }
});

module.exports = router;
