const jwt = require('jsonwebtoken');
const { ROLE_ADMIN } = require('../utils/constants');
const config = require('config');

function auth(req, res, next) {
  const token = req.header('x-auth-token');
  if (!token)
    return res
      .status(401)
      .json({ msg: 'Authentication token not found, authorization denied' });

  try {
    jwt.verify(token, config.get('jwtSecret'), (error, decoded) => {
      if (error) {
        return res
          .status(401)
          .json({ msg: 'Authentication token is not valid' });
      } else {
        req.user = decoded.user;
        next();
      }
    });
  } catch (err) {
    console.error('Something went wrong with auth middleware: ');
    console.error(err);
    res.status(401).json({ msg: 'Server error' });
  }
}

function authAdmin(req, res, next) {
  const token = req.header('x-auth-token');
  if (!token)
    return res
      .status(401)
      .json({ msg: 'Authentication token not found, authorization denied' });

  try {
    jwt.verify(token, config.get('jwtSecret'), (error, decoded) => {
      if (error) {
        return res
          .status(401)
          .json({ msg: 'Authentication token is not valid' });
      }

      const user = decoded.user;

      if (user.role !== ROLE_ADMIN) {
        return res.status(401).json({ msg: 'You are not authorized' });
      }

      req.user = user;
      next();
    });
  } catch (err) {
    console.error('Something went wrong with admin auth middleware: ');
    console.error(err);
    res.status(401).json({ msg: 'Server error' });
  }
}

module.exports = {
  auth,
  authAdmin,
};
