const { body } = require('express-validator');

// ******** CHAINS HELPERS ********
const strNotEmp = ({ baseKey, keys }) =>
  keys.map((k) =>
    body(baseKey ? `${baseKey}.${k}` : k)
      .isString()
      .notEmpty()
  );

const strNotEmpOnNestedOpt = ({ baseKey, keys }) =>
  keys.map((k) => body(`${baseKey}.${k}`).if(body(baseKey).exists()).isString().notEmpty());

const isBool = ({ baseKey, keys }) =>
  keys.map((k) => body(baseKey ? `${baseKey}.${k}` : k).isBoolean());

const isNumeric = ({ baseKey, keys }) =>
  keys.map((k) => body(baseKey ? `${baseKey}.${k}` : k).isNumeric());

const isNumericOpt = ({ baseKey, keys }) =>
  keys.map((k) => body(`${baseKey}.${k}`).optional().isNumeric());
// ******** CHAINS HELPERS ********

const applyInMinutes = [
  body('amountLookingFor').isNumeric(),
  ...strNotEmp({ keys: ['loanType', 'currentProcess', 'timeToFunds', 'leadSource'] }),
];

// ******** Large Form = Apply Now ********

const s1_applyNow_WhereARYProcess = [body('s1_currentProcess').isArray()];

const s2_applyNow_borrowersInfo = [
  body('s2_borrowersInfo.email').isEmail(),
  body('s2_borrowersInfo.dateBirth').isISO8601(),
  ...strNotEmp({
    baseKey: 's2_borrowersInfo',
    keys: [
      'name',
      'lastName',
      'phoneNumber',
      'coBorrowerAddress',
      'ownOrRent',
      'maritalStatus',
      'currentStatus',
    ],
  }),
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
  body('s2_borrowersInfo.coBorrowerAddt.email')
    .if(body('s2_borrowersInfo.coBorrowerAddt').exists())
    .isEmail(),
  body('s2_borrowersInfo.coBorrowerAddt.dateBirth')
    .if(body('s2_borrowersInfo.coBorrowerAddt').exists())
    .isISO8601(),
  ...strNotEmpOnNestedOpt({
    baseKey: 's2_borrowersInfo.coBorrowerAddt',
    keys: [
      'name',
      'lastName',
      'phoneNumber',
      'coBorrowerAddress',
      'ownOrRent',
      'maritalStatus',
      'currentStatus',
    ],
  }),
];

const s3_applyNow_borrowerType = [
  body('s3_borrowerType.nameSelect').isArray(),
  ...strNotEmp({
    baseKey: 's3_borrowerType',
    keys: ['name', 'structure', 'address', 'cityAndState', 'zipCode'],
  }),
];

const s4_applyNow_borrowerBackground = [
  body('s4_borrowerBack.explanation').optional().isString(),
  ...isBool({
    baseKey: 's4_borrowerBack',
    keys: Array.from({ length: 7 }, (_, i) => `p${i + 1}`),
  }),
];

const s5_applyNow_borrowerExperience = [
  body('s5_borrowerExp.propertiesTransacted36m').isNumeric(),
  body('s5_borrowerExp.liquidAssets').isNumeric(),
  ...isBool({
    baseKey: 's5_borrowerExp',
    keys: [
      'hasFlipHoldExperience',
      'has12MortgagePayments',
      'ownsInvestmentProperties',
      'hasProfessionalLicenses',
    ],
  }),
];

const s6_ = []; // **PENDING

const s7_applyNow_subjectProperty = [
  body('s7_subjectProperty.yearBuilt').isNumeric().isLength({ min: 4, max: 4 }),
  ...isNumericOpt({
    baseKey: 's7_subjectProperty',
    keys: ['numberBuildings', 'numberUnits', 'tenantOccupancyRate'],
  }),
  ...strNotEmp({ baseKey: 's7_subjectProperty', keys: ['address', 'state', 'zipCode', 'type'] }),
];

const s8_applyNow_propertyDetails = [
  body('s8_propertyDetails.pricePerDoor').optional().isNumeric(),
  ...isNumeric({
    baseKey: 's8_propertyDetails',
    keys: [
      'annualPropertyTaxes',
      'correctOccupancy',
      'annualInsurance',
      'currentRentalIncome',
      'rehabDurationMonths',
    ],
  }),
  body('s8_propertyDetails.occupancyNotes').isString(),
];

const s9_applyNow_leadSource = [body('s9_leadSource').isArray()];

const applyNow = [
  ...s1_applyNow_WhereARYProcess,
  ...s2_applyNow_borrowersInfo,
  ...s3_applyNow_borrowerType,
  ...s4_applyNow_borrowerBackground,
  ...s5_applyNow_borrowerExperience,
  ...s6_, // **PENDING
  ...s7_applyNow_subjectProperty,
  ...s8_applyNow_propertyDetails,
  ...s9_applyNow_leadSource,
];

module.exports = { applyInMinutes, applyNow };
