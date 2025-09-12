const connection = require('../../db/connection').getConnection();
const { models } = connection;
const { formApplyInMinutes, formApplyNow } = models;

const newFormApplyInMinutes = (data) => new formApplyInMinutes(data).save();
const newApplyNow = (data) => new formApplyNow(data).save();

module.exports = { newFormApplyInMinutes, newApplyNow };
