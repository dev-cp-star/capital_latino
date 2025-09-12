const express = require('express');
const requestValidator = require('../../middlewares/express-validator');
const { body } = require('express-validator');
const formsService = require('../../services/forms');
const formsChain = require('./express-validator-utils/formsChain');
const JwtValidation = require('../../middlewares/jwt');
const router = express.Router();

router.post('/applyInMinutes', [
  JwtValidation,
  ...formsChain.applyInMinutes,
  requestValidator,
  async (req, res) => {
    try {
      await formsService.createApplyInMinutesRegistry(req);
      res.status(200).json({ msg: 'Form successfully sent' });
    } catch (err) {
      res.status(500).json({ msg: 'Unexpected error' });
    }
  },
]);

router.post('/applyNow', [
  JwtValidation,
  ...formsChain.applyNow,
  requestValidator,
  async (req, res) => {
    try {
      await formsService.createApplyNowRegistry(req);
      res.status(200).json({ msg: 'Form successfully sent' });
    } catch (err) {
      res.status(500).json({ msg: 'Unexpected error' });
    }
  },
]);

module.exports = router;
