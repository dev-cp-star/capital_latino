const jwt = require('jsonwebtoken');

const JwtValidation = (req, res, next) => {
  if (req.headers['authorization']) {
    try {
      let authorization = req.headers['authorization']?.split(' ');
      if (authorization[0] !== 'Bearer') {
        res.status(401).json({ msg: 'No Authorization' });
      } else {
        req.jwt = jwt.verify(authorization[1], process.env.JWT_SECRET_KEY);
        next();
      }
    } catch (err) {
      res.status(403).json({ msg: 'Forbidden' });
    }
  } else {
    res.status(401).json({ msg: 'No Authorization' });
  }
};

module.exports = JwtValidation;
