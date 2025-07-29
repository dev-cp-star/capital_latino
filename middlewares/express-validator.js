const { validationResult } = require('express-validator');

const requestValidator = (req, res, next) => {
  const result = validationResult(req);
  if (!result.isEmpty()) {
    return res.status(400).json({ msg: 'Missing data', missingData: result.mapped() });
  }
  next();
};

module.exports = requestValidator;
