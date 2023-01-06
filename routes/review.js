const { application } = require("express");
const express = require("express");
const jwt = require("jsonwebtoken");
const { Op } = require("sequelize");
const { Customer, Supplier, Laundry, Review } = require("../models");
// customer 인증 미들웨어
const jwtCustomer = require("../middlewares/jwt-customer.js");
// supplier 인증 미들웨어
const jwtSupplier = require("../middlewares/jwt-supplier.js");

const router = express.Router();

// supplier, customer : 리뷰 조회 페이지
router.get("/review/list/:supplierId", async (req, res) => {
  try {
    const { supplierId } = req.params;

    const reviews = await Review.findAll({ supplierId });

    if (!reviews) {
      res.status(400).json({ Message: "작성된 리뷰가 없습니다." });
    }
    return res.status(200).json({ reviews });
  } catch (error) {
    console.error(error), res.status(500).json({ errorMessage: error.Message });
  }
});

// customer : 리뷰 작성 페이지

router.post("/reviewWriter", async (req, res) => {
  try {
    const { title, nickname, password, content } = req.body;
    if (password !== confirmPassword) {
      res.status(400).send({
        errorMessage: "패스워드가 패스워드 확인란과 동일하지 않습니다.",
      });
      return;
    }

    const existReviews = await Reviews.findAll({
      where: {
        [Op.or]: [{ nickname: nickname }],
      },
    });

    if (existReviews.length > 0) {
      res.status(400).json({
        errorMessage: "Nickname이 이미 사용 중입니다.",
      });
      return;
    }

    const review = new Reviews({
      nickname,
      email,
      password,
      confirmPassword,
      cellPhone,
    });
    await review.save();

    res.status(201).send({ message: "리뷰등록에 성공하였습니다." });
  } catch (error) {
    console.error(error);
    res.status(500).json({ errorMessage: error.Message });
  }
});

// router.post("/reviewWrite", jwtCustomer, async (req, res) => {
//   try {
//     const customer = res.locals.customer;
//     const customerId = customer.customerId;
//     const nickname = customer.nickname;

//     const { supplierId, laundryId } = req.params;
//     const { content } = req.body;
//     try {
//       await Review.create({
//         customerId,
//         supplierId,
//         laundryId,
//         content,
//         nickname,
//       });
//       return res.status(200).json({ Message: "리뷰작성이 완료되었습니다." });
//     } catch {
//       if (!content) {
//         return res.status(400).json({ Message: "내용을 작성해 주세요." });
//       }
//       if (!customerId || !supplierId || !laundryId || !nickname) {
//         return res
//           .status(400)
//           .json({ Message: "데이터 형식이 잘못되었습니다." });
//       }
//     }
//   } catch (error) {
//     console.error(error), res.status(500).json({ errorMessage: error.Message });
//   }
// });
// customer : 리뷰 수정 페이지
router.patch(
  "/review/:supplierId/:laundryId/:customerId",
  jwtCustomer,
  async (req, res) => {
    try {
      const customer = res.locals.customer;
      const customerId = customer.customerId;

      const { supplierId, laundryId } = req.params;
      const { content } = req.body;
      try {
        await Review.update({ where: { customerId } }, { content });
        res.status(201).json({ Message: "리뷰 수정 완료" });
      } catch {
        if (!content) {
          return res.status(400).json({ Message: "내용을 작성해 주세요." });
        }
        if (!supplierId || !laundryId) {
          return res.status(400).json({ Message: "잘못된 접근입니다." });
        }
      }
    } catch (error) {
      console.error(error),
        res.status(500).json({ errorMessage: error.Message });
    }
  }
);
// customer : 리뷰 삭제 페이지
router.delete(
  "/review/:supplierId/:laundryId/:customerId",
  jwtCustomer,
  async (req, res) => {
    try {
      const customer = res.locals.customer;
      const customerId = customer.customerId;

      const { supplierId, laundryId } = req.params;

      try {
        await Review.destroy({ where: { customerId } });
        return res.status(200).json({ Message: "리뷰 삭제가 완료되었습니다." });
      } catch {
        if (!supplierId || !laundryId || !customerId) {
          return res.status(400).json({ Message: "잘못된 접근입니다." });
        }
      }
    } catch (error) {
      console.error(error),
        res.status(500).json({ errorMessage: error.Message });
    }
  }
);

module.exports = router;
