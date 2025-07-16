const connection = require('../connection').getConnection();

const create = (credentials) =>
  connection.query('INSERT INTO users(email, password) VALUES (?, ?)', [
    credentials.email,
    credentials.password,
  ]);

const findByEmail = (email) =>
  connection.query('SELECT * FROM users WHERE email=? LIMIT 1', [email]);

module.exports = { create, findByEmail };
