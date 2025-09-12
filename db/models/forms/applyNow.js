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
  },
  { timestamps: true }
);

module.exports = applyNowSchema;
