const crypto = require('crypto');
const jwt = require('jsonwebtoken');

const userRepository = require('../../repository/users');

const createUser = async ({ payload }) => {
  const email = payload.email;
  const password = payload.password;

  const salt = crypto.randomBytes(16).toString('base64');
  const hash = crypto.createHmac('sha512', salt).update(password).digest('base64');

  const newPassword = salt + '$' + hash;

  await userRepository.create({ email, password: newPassword });
};

const login = async ({ payload }) => {
  const email = payload.email;

  const [rows, fields] = await userRepository.findByEmail(email);

  if (!rows[0]) {
    return { ok: false, tkn: '' };
  }

  const password = payload.password;
  const [salt, hash] = rows[0].password?.split('$');

  if (hash !== crypto.createHmac('sha512', salt).update(password).digest('base64')) {
    return { ok: false, tkn: '' };
  }

  const token = jwt.sign({ id: rows[0].id }, process.env.JWT_SECRET_KEY);

  return { ok: true, tkn: token };
};

module.exports = { createUser, login };
