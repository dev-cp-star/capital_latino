const express = require('express');
const router = express.Router();
const formOptionsService = require('../../services/form_options');
const { body, param } = require('express-validator');
const requestValidator = require('../../middlewares/express-validator');
const { FormNotAvailable } = require('../../errors/form-options');

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
  body('fields').isArray({ min: 1 }).withMessage('fields must be a non-empty array'),
  body('fields.*.name')
    .isString()
    .withMessage('FieldName is not text')
    .notEmpty()
    .withMessage('FieldName is empty'),
  body('fields.*.fieldValues')
    .isArray({ min: 1 })
    .withMessage('fieldValues must be a non-empty array'),
  body('fields.*.fieldValues.*.text')
    .isString()
    .withMessage('Must be text')
    .notEmpty()
    .withMessage('Must not be empty'),
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

router.get('/form/:formId', [
  param('formId').isNumeric().withMessage('FormId is required'),
  requestValidator,
  async (req, res) => {
    try {
      const data = await formOptionsService.getFieldsAndValuesByForm({ formId: req.params.formId });
      res.status(200).json(data);
    } catch (err) {
      if (err instanceof FormNotAvailable) {
        return res.status(404).json({ msg: err.message });
      }
      res.status(500).json({ msg: 'Unexpected error' });
    }
  },
]);

module.exports = router;
