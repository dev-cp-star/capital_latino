const { body } = require('express-validator');

const applyInMinutes = [
  body('loanType')
    .isString()
    .withMessage('Loan Type is required')
    .notEmpty()
    .withMessage('It can not be empty'),
  body('currentProcess')
    .isString()
    .withMessage('Current Process is required')
    .notEmpty()
    .withMessage('It can not be empty'),
  body('amountLookingFor').isNumeric().withMessage('Amount looking for should be numeric'),
  body('timeToFunds')
    .isString()
    .withMessage('Time to Funds is required')
    .notEmpty()
    .withMessage('It can not be empty'),
  body('leadSource')
    .isString()
    .withMessage('Lead source is required')
    .notEmpty()
    .withMessage('It can not be empty'),
];

const borrowersInfo = [
  body('name')
    .isString()
    .withMessage('Name is required')
    .notEmpty()
    .withMessage('It can not be empty'),
  body('lastName')
    .isString()
    .withMessage('Last Name is required')
    .notEmpty()
    .withMessage('It can not be empty'),
  body('email').isString().withMessage('Email must be text').isEmail().withMessage('Invalid Email'),
  body('phoneNumber')
    .isString()
    .withMessage('Cell Number is required')
    .notEmpty()
    .withMessage('It can not be empty'),
  body('coBorrowerAddress')
    .isString()
    .withMessage('Co-Borr-Address is required')
    .notEmpty()
    .withMessage('It can not be empty'),
  body('dateBirth')
    .isISO8601()
    .withMessage('Invalid date format')
    .notEmpty()
    .withMessage('It can not be empty'),
  body('ownOrRent')
    .isString()
    .withMessage('Own or rent is required')
    .notEmpty()
    .withMessage('It can not be empty'),
  body('maritalStatus')
    .isString()
    .withMessage('Marital Status is required')
    .notEmpty()
    .withMessage('It can not be empty'),
  body('currentStatus')
    .isString()
    .withMessage('Current Status is required')
    .notEmpty()
    .withMessage('It can not be empty'),
  body('coBorrowerAddt')
    .optional()
    .isObject()
    .withMessage('Co Borrower Info is required')
    .custom((value, { req }) => {
      if (Object.keys(value).length === 0) {
        throw new Error('coBorrowerAddt can not be empty');
      }
      return true;
    }),
  body('coBorrowerAddt')
    .optional()
    .bail()
    .isObject()
    .withMessage('coBorrowerAddt must be an Object')
    .bail(),
  body('coBorrowerAddt.name')
    .if(body('coBorrowerAddt').exists())
    .isString()
    .withMessage('Name is required')
    .notEmpty()
    .withMessage('It can not be empty'),
  body('coBorrowerAddt.lastName')
    .if(body('coBorrowerAddt').exists())
    .isString()
    .withMessage('Last Name is required')
    .notEmpty()
    .withMessage('It can not be empty'),
  body('coBorrowerAddt.email')
    .if(body('coBorrowerAddt').exists())
    .isString()
    .withMessage('Email must be text')
    .isEmail()
    .withMessage('Invalid Email'),
  body('coBorrowerAddt.phoneNumber')
    .if(body('coBorrowerAddt').exists())
    .isString()
    .withMessage('Cell Number is required')
    .notEmpty()
    .withMessage('It can not be empty'),
  body('coBorrowerAddt.coBorrowerAddress')
    .if(body('coBorrowerAddt').exists())
    .isString()
    .withMessage('Co-Borr-Address is required')
    .notEmpty()
    .withMessage('It can not be empty'),
  body('coBorrowerAddt.dateBirth')
    .if(body('coBorrowerAddt').exists())
    .isISO8601()
    .withMessage('Invalid date format')
    .notEmpty()
    .withMessage('It can not be empty'),
  body('coBorrowerAddt.ownOrRent')
    .if(body('coBorrowerAddt').exists())
    .isString()
    .withMessage('Own or rent is required')
    .notEmpty()
    .withMessage('It can not be empty'),
  body('coBorrowerAddt.maritalStatus')
    .if(body('coBorrowerAddt').exists())
    .isString()
    .withMessage('Marital Status is required')
    .notEmpty()
    .withMessage('It can not be empty'),
  body('coBorrowerAddt.currentStatus')
    .if(body('coBorrowerAddt').exists())
    .isString()
    .withMessage('Current Status is required')
    .notEmpty()
    .withMessage('It can not be empty'),
];

module.exports = { applyInMinutes, borrowersInfo };
