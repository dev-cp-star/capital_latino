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

  const user = await userRepository.findByEmail(email);

  if (!user) {
    return null;
  }

  const password = payload.password;
  const [salt, hash] = user.password?.split('$');

  if (hash !== crypto.createHmac('sha512', salt).update(password).digest('base64')) {
    return null;
  }

  const token = jwt.sign({ _id: user._id, email: user.email }, process.env.JWT_SECRET_KEY);

  return token;
};

module.exports = { createUser, login };
