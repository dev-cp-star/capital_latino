const mongoose = require('mongoose');

const borrowersInfoSchema = mongoose.Schema(
  {
    user: {},
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
  { timestamps: true }
);

module.exports = borrowersInfoSchema;
