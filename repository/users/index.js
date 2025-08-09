const connection = require("../../db/connection").getConnection();
const { models } = connection;
const { user } = models;

const create = (credentials) =>
  new user({ email: credentials.email, password: credentials.password }).save();

const findByEmail = (email) => user.findOne({ email });

module.exports = { create, findByEmail };
