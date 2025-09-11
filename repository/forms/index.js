const connection = require('../../db/connection').getConnection();
const { models } = connection;
const { formApplyInMinutes, formBorrowersInfo } = models;

const newFormApplyInMinutes = (data) => new formApplyInMinutes(data).save();
const newBorrowersInfo = (data) => new formBorrowersInfo(data).save();

module.exports = { newFormApplyInMinutes, newBorrowersInfo };
