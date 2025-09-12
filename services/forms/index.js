const mongoose = require('mongoose');
const formsRepository = require('../../repository/forms');

const createApplyInMinutesRegistry = (req) =>
  formsRepository.newFormApplyInMinutes({
    ...req.body,
    user: { ...req.jwt, _id: new mongoose.Types.ObjectId(req.jwt._id) },
  });

const createApplyNowRegistry = (req) =>
  formsRepository.newApplyNow({
    ...req.body,
    user: { ...req.jwt, _id: new mongoose.Types.ObjectId(req.jwt._id) },
  });

module.exports = { createApplyInMinutesRegistry, createApplyNowRegistry };
