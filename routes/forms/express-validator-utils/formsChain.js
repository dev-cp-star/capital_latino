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

// ******** Large Form = Apply Now ********

const s1_applyNow_WhereARYProcess = [
  body('s1_currentProcess').isArray().withMessage('It should be an Array'),
];

const s2_applyNow_borrowersInfo = [
  body('s2_borrowersInfo.name')
    .isString()
    .withMessage('Name is required')
    .notEmpty()
    .withMessage('It can not be empty'),
  body('s2_borrowersInfo.lastName')
    .isString()
    .withMessage('Last Name is required')
    .notEmpty()
    .withMessage('It can not be empty'),
  body('s2_borrowersInfo.email')
    .isString()
    .withMessage('Email must be text')
    .isEmail()
    .withMessage('Invalid Email'),
  body('s2_borrowersInfo.phoneNumber')
    .isString()
    .withMessage('Cell Number is required')
    .notEmpty()
    .withMessage('It can not be empty'),
  body('s2_borrowersInfo.coBorrowerAddress')
    .isString()
    .withMessage('Co-Borr-Address is required')
    .notEmpty()
    .withMessage('It can not be empty'),
  body('s2_borrowersInfo.dateBirth')
    .isISO8601()
    .withMessage('Invalid date format')
    .notEmpty()
    .withMessage('It can not be empty'),
  body('s2_borrowersInfo.ownOrRent')
    .isString()
    .withMessage('Own or rent is required')
    .notEmpty()
    .withMessage('It can not be empty'),
  body('s2_borrowersInfo.maritalStatus')
    .isString()
    .withMessage('Marital Status is required')
    .notEmpty()
    .withMessage('It can not be empty'),
  body('s2_borrowersInfo.currentStatus')
    .isString()
    .withMessage('Current Status is required')
    .notEmpty()
    .withMessage('It can not be empty'),
  body('s2_borrowersInfo.coBorrowerAddt')
    .optional()
    .isObject()
    .withMessage('Co Borrower Info is required')
    .custom((value, { req }) => {
      if (Object.keys(value).length === 0) {
        throw new Error('coBorrowerAddt can not be empty');
      }
      return true;
    }),
  body('s2_borrowersInfo.coBorrowerAddt')
    .optional()
    .bail()
    .isObject()
    .withMessage('coBorrowerAddt must be an Object')
    .bail(),
  body('s2_borrowersInfo.coBorrowerAddt.name')
    .if(body('s2_borrowersInfo.coBorrowerAddt').exists())
    .isString()
    .withMessage('Name is required')
    .notEmpty()
    .withMessage('It can not be empty'),
  body('s2_borrowersInfo.coBorrowerAddt.lastName')
    .if(body('s2_borrowersInfo.coBorrowerAddt').exists())
    .isString()
    .withMessage('Last Name is required')
    .notEmpty()
    .withMessage('It can not be empty'),
  body('s2_borrowersInfo.coBorrowerAddt.email')
    .if(body('s2_borrowersInfo.coBorrowerAddt').exists())
    .isString()
    .withMessage('Email must be text')
    .isEmail()
    .withMessage('Invalid Email'),
  body('s2_borrowersInfo.coBorrowerAddt.phoneNumber')
    .if(body('s2_borrowersInfo.coBorrowerAddt').exists())
    .isString()
    .withMessage('Cell Number is required')
    .notEmpty()
    .withMessage('It can not be empty'),
  body('s2_borrowersInfo.coBorrowerAddt.coBorrowerAddress')
    .if(body('s2_borrowersInfo.coBorrowerAddt').exists())
    .isString()
    .withMessage('Co-Borr-Address is required')
    .notEmpty()
    .withMessage('It can not be empty'),
  body('s2_borrowersInfo.coBorrowerAddt.dateBirth')
    .if(body('s2_borrowersInfo.coBorrowerAddt').exists())
    .isISO8601()
    .withMessage('Invalid date format')
    .notEmpty()
    .withMessage('It can not be empty'),
  body('s2_borrowersInfo.coBorrowerAddt.ownOrRent')
    .if(body('s2_borrowersInfo.coBorrowerAddt').exists())
    .isString()
    .withMessage('Own or rent is required')
    .notEmpty()
    .withMessage('It can not be empty'),
  body('s2_borrowersInfo.coBorrowerAddt.maritalStatus')
    .if(body('s2_borrowersInfo.coBorrowerAddt').exists())
    .isString()
    .withMessage('Marital Status is required')
    .notEmpty()
    .withMessage('It can not be empty'),
  body('s2_borrowersInfo.coBorrowerAddt.currentStatus')
    .if(body('s2_borrowersInfo.coBorrowerAddt').exists())
    .isString()
    .withMessage('Current Status is required')
    .notEmpty()
    .withMessage('It can not be empty'),
];

const s3_applyNow_borrowerType = [
  body('s3_borrowerType.nameSelect').isArray().withMessage('It should be an Array'),
  body('s3_borrowerType.name')
    .isString()
    .withMessage('Name is required')
    .notEmpty()
    .withMessage('It can not be empty'),
  body('s3_borrowerType.structure')
    .isString()
    .withMessage('Company Structure is required')
    .notEmpty()
    .withMessage('It can not be empty'),
  body('s3_borrowerType.address')
    .isString()
    .withMessage('Company Address is required')
    .notEmpty()
    .withMessage('It can not be empty'),
  body('s3_borrowerType.cityAndState')
    .isString()
    .withMessage('City and state is required')
    .notEmpty()
    .withMessage('It can not be empty'),
  body('s3_borrowerType.zipCode')
    .isString()
    .withMessage('Company ZipCode is required')
    .notEmpty()
    .withMessage('It can not be empty'),
];

const applyNow = [
  ...s1_applyNow_WhereARYProcess,
  ...s2_applyNow_borrowersInfo,
  ...s3_applyNow_borrowerType,
];

module.exports = { applyInMinutes, applyNow };
