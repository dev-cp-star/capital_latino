const express = require('express');
const router = express.Router();
const userService = require('../../services/users');
const { body } = require('express-validator');
const requestValidator = require('../../middlewares/express-validator');

router.post('/create', [
  body('email')
    .isEmail()
    .withMessage('Invalid Email')
    .isLength({ max: 100 })
    .withMessage('Email too large. Max 100 characters'),
  body('password')
    .isLength({ min: 6, max: 25 })
    .withMessage('Password must be between 6 and 25 characters'),
  requestValidator,
  async (req, res) => {
    try {
      await userService.createUser({ payload: req.body });
      res.status(200).json({ success: true, msg: 'User successfully created' });
    } catch (err) {
      res.status(500).json({ success: false, msg: 'Unexpected error' });
    }
  },
]);

router.post('/auth', [
  body('email')
    .isEmail()
    .withMessage('Invalid Email')
    .isLength({ max: 100 })
    .withMessage('Email too large. Max 100 characters'),
  body('password')
    .isLength({ min: 6, max: 25 })
    .withMessage('Password must be between 6 and 25 characters'),
  requestValidator,
  async (req, res) => {
    try {
      const { ok, tkn } = await userService.login({ payload: req.body });
      if (!ok) {
        return res.status(401).json({ success: false, msg: 'Incorrect credentials' });
      }
      if (!tkn) {
        throw new Error('Token no present');
      }
      res.status(200).json({ success: true, token: tkn });
    } catch (err) {
      res.status(500).json({ success: false, msg: 'Unexpected error' });
    }
  },
]);

module.exports = router;
