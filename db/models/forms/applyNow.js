const mongoose = require('mongoose');

const applyNowSchema = mongoose.Schema(
  {
    user: {},
    s1_currentProcess: [],
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
      nameSelect: [],
      name: String,
      structure: String,
      address: String,
      cityAndState: String,
      zipCode: String,
    },
    s4_borrowerBack: {
      explanation: String,
      p1: Boolean,
      p2: Boolean,
      p3: Boolean,
      p4: Boolean,
      p5: Boolean,
      p6: Boolean,
      p7: Boolean,
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
    s8_propertyDetails: {
      pricePerDoor: Number,
      annualPropertyTaxes: Number,
      correctOccupancy: Number,
      annualInsurance: Number,
      occupancyNotes: String,
      currentRentalIncome: Number,
      rehabDurationMonths: Number,
    },
    s9_leadSource: [],
  },
  { timestamps: true }
);

module.exports = applyNowSchema;
