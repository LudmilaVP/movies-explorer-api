const jwt = require('jsonwebtoken');
const AuthError = require('../errors/AuthError.js');

const { NODE_ENV, JWT_SECRET } = process.env;

module.exports = (req, res, next) => {
  const token = req.cookies.jwt;
  let payload;

  try {
    payload = jwt.verify(token, NODE_ENV === 'production' ? JWT_SECRET : 'dev-secret');
  } catch (err) {
    next(new AuthError('Передан неверный логин или пароль'));
    return;
  }

  req.user = payload;

  next();
};
