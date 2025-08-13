const express = require("express");
const router = express.Router();
const formOptionsService = require("../../services/form_options");
const { body, param } = require("express-validator");
const requestValidator = require("../../middlewares/express-validator");
const { FormNotAvailable } = require("../../errors/form-options");

router.post("/form", [
  body("formId").isNumeric().withMessage("FormId is required"),
  body("formName")
    .isString()
    .withMessage("Must be text")
    .notEmpty()
    .withMessage("Cannot be empty"),
  body("fields")
    .isArray({ min: 1 })
    .withMessage("At least one field is required"),
  body("fields.*.name")
    .isString()
    .withMessage("Must be text")
    .notEmpty()
    .withMessage("Cannot be empty"),
  body("fields.*.values.*.text")
    .isString()
    .withMessage("Must be text")
    .notEmpty()
    .withMessage("Cannot be empty"),
  requestValidator,
  async (req, res) => {
    try {
      await formOptionsService.createForm({
        payload: req.body,
      });
      res.status(200).json({ msg: "Form successfully created" });
    } catch (err) {
      res.status(500).json({ msg: "Unexpected error" });
    }
  },
]);

router.get("/form/:formId", [
  param("formId").isNumeric().withMessage("FormId is required"),
  requestValidator,
  async (req, res) => {
    try {
      const data = await formOptionsService.getFieldsAndValuesByForm({
        formId: req.params.formId,
      });
      res.status(200).json(data);
    } catch (err) {
      if (err instanceof FormNotAvailable) {
        return res.status(404).json({ msg: err.message });
      }
      res.status(500).json({ msg: "Unexpected error" });
    }
  },
]);

module.exports = router;
