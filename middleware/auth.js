const jwt = require('jsonwebtoken');
const config = require('config');

module.exports = function (req, res, next) {
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
};
