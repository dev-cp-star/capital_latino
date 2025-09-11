const mongoose = require('mongoose');

const applyInMinutesSchema = mongoose.Schema(
  {
    loanType: String,
    currentProcess: String,
    amountLookingFor: Number,
    timeToFunds: String,
    leadSource: String,
    user: {},
  },
  { timestamps: true }
);

module.exports = applyInMinutesSchema;
