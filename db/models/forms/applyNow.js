const mongoose = require('mongoose');

const applyNowSchema = mongoose.Schema(
  {
    user: {},
    s1_currentProcess: [String],
    s2_borrowersInfo: {
      name: String,
      lastName: String,
      email: String,
      phoneNumber: String,
      coBorrowerAddress: String,
      dateBirth: Date, // ISO8601
      ownOrRent: String,
      maritalStatus: String,
      currentStatus: String,
      coBorrowerAddt: {
        name: String,
        lastName: String,
        email: String,
        phoneNumber: String,
        coBorrowerAddress: String,
        dateBirth: Date, // ISO8601
        ownOrRent: String,
        maritalStatus: String,
        currentStatus: String,
      },
    },
    s3_borrowerType: {
      nameSelect: [String],
      name: String,
      structure: String,
      address: String,
      cityAndState: String,
      zipCode: String,
    },
    s4_borrowerBack: {
      explanation: String,
      ...Object.fromEntries(Array.from({ length: 7 }, (_, i) => [`p${i + 1}`, Boolean])),
    },
    s5_borrowerExp: {
      propertiesTransacted36m: Number,
      liquidAssets: Number,
      hasFlipHoldExperience: Boolean,
      has12MortgagePayments: Boolean,
      ownsInvestmentProperties: Boolean,
      hasProfessionalLicenses: Boolean,
    },
    s6_: {}, // **PENDING
    s7_subjectProperty: {
      address: String,
      state: String,
      zipCode: String,
      type: String,
      yearBuilt: Number,
      numberBuildings: Number,
      numberUnits: Number,
      tenantOccupancyRate: Number,
    },
  },
  { timestamps: true }
);

module.exports = applyNowSchema;
