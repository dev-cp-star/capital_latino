const express = require("express");
const router = express.Router();
const userService = require("../../services/users");
const { body } = require("express-validator");
const requestValidator = require("../../middlewares/express-validator");

router.post("/create", [
  body("email")
    .isString()
    .withMessage("Email must be text")
    .isEmail()
    .withMessage("Invalid Email")
    .isLength({ max: 100 })
    .withMessage("Email too large. Max 100 characters"),
  body("password")
    .isString()
    .withMessage("Password must be text")
    .isLength({ min: 6, max: 25 })
    .withMessage("Password must be between 6 and 25 characters"),
  requestValidator,
  async (req, res) => {
    try {
      await userService.createUser({ payload: req.body });
      res.status(200).json({ msg: "User successfully created" });
    } catch (err) {
      res.status(500).json({ msg: "Unexpected error" });
    }
  },
]);

router.post("/auth", [
  body("email")
    .isString()
    .withMessage("Email must be a string")
    .isEmail()
    .withMessage("Invalid Email")
    .isLength({ max: 100 })
    .withMessage("Email too large. Max 100 characters"),
  body("password")
    .isString()
    .withMessage("Password must be text")
    .isLength({ min: 6, max: 25 })
    .withMessage("Password must be between 6 and 25 characters"),
  requestValidator,
  async (req, res) => {
    try {
      const token = await userService.login({ payload: req.body });
      if (!token) {
        return res.status(401).json({ msg: "Incorrect credentials" });
      }
      res.status(200).json({ token });
    } catch (err) {
      console.log(err);
      res.status(500).json({ msg: "Unexpected error" });
    }
  },
]);

module.exports = router;
