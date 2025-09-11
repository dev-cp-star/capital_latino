const mongoose = require('mongoose');
const formsRepository = require('../../repository/forms');

const createApplyInMinutesRegistry = (req) =>
  formsRepository.newFormApplyInMinutes({
    ...req.body,
    user: { ...req.jwt, _id: new mongoose.Types.ObjectId(req.jwt._id) },
  });

const createBorrowersInfoRegistry = (req) =>
  formsRepository.newBorrowersInfo({
    ...req.body,
    user: { ...req.jwt, _id: new mongoose.Types.ObjectId(req.jwt._id) },
  });

module.exports = { createApplyInMinutesRegistry, createBorrowersInfoRegistry };
