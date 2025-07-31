const express = require('express');
const router = express.Router();
const formOptionsService = require('../../services/form_options');
const { body } = require('express-validator');
const requestValidator = require('../../middlewares/express-validator');

router.post('/form', [
  body('formName')
    .isString()
    .withMessage('Form Name must be text')
    .notEmpty()
    .withMessage('Form Name cannot be empty'),
  requestValidator,
  async (req, res) => {
    try {
      const formIdInserted = await formOptionsService.createForm({ payload: req.body });
      res.status(200).json({ msg: 'Form successfully created', formId: formIdInserted });
    } catch (err) {
      res.status(500).json({ msg: 'Unexpected error' });
    }
  },
]);

router.post('/fields', [
  body('formId').isNumeric().withMessage('FormId is required'),
  body('fields').isArray({ min: 1 }).withMessage('fields must have at least one new field'),
  body('fields.*.name')
    .isString()
    .withMessage('Some fieldName is not text')
    .notEmpty()
    .withMessage('Some fieldName is empty'),
  requestValidator,
  async (req, res) => {
    try {
      await formOptionsService.createFields({ payload: req.body });
      res.status(200).json({ msg: 'Field(s) successfully created' });
    } catch (err) {
      res.status(500).json({ msg: 'Unexpected error' });
    }
  },
]);

router.post('/values', [
  body('fieldId').isNumeric().withMessage('fieldId is required'),
  body('values').isArray({ min: 1 }).withMessage('values must have at least one new value'),
  body('values.*.value')
    .optional()
    .isString()
    .withMessage('Some nested value key is not text')
    .notEmpty()
    .withMessage('Some nested value key is empty'),
  body('values.*.inner_text')
    .isString()
    .withMessage('Some nested inner_text key is not text')
    .notEmpty()
    .withMessage('Some nested inner_text key is empty'),
  requestValidator,
  async (req, res) => {
    try {
      await formOptionsService.createValues({ payload: req.body });
      res.status(200).json({ msg: 'Value(s) successfully created' });
    } catch (err) {
      res.status(500).json({ msg: 'Unexpected error' });
    }
  },
]);

module.exports = router;
