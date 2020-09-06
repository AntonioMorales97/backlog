const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../../models/User');

// @route   POST api/auth
// @desc    Try to authenticate user
// @access  Public
router.post('/', (req, res) => {
  const { password } = req.body;
  let email = req.body.email;

  if (!email || !password) {
    return res.status(400).json({ msg: 'Please enter all fields!' });
  }

  email = email.toLowerCase();

  User.findOne({ email }).then((user) => {
    if (!user) {
      res.status(404).json({ msg: 'User does not exist' });
    }

    bcrypt
      .compare(password, user.password)
      .then((isMatch) => {
        if (!isMatch) {
          return res.status(400).json({ msg: 'Invalid credentials' });
        }

        jwt.sign(
          {
            id: user.id,
            name: user.name,
            email: user.email,
          },
          process.env.JWT_SECRET,
          { expiresIn: 3600 },
          (err, token) => {
            if (err) {
              throw err;
            }

            const cookieConfig = {
              httpOnly: true,
              maxAge: 3600 * 1000,
              signed: true,
            };

            res.cookie(process.env.COOKIE_USER_TOKEN, token, cookieConfig);
            res.status(200).json({
              id: user.id,
              name: user.name,
              email: user.email,
            });
          }
        );
      })
      .catch((err) => console.log(err));
  });
});

// @route   GET api/auth/logout
// @desc    Logout user by removing signed cookie 'token'
// @access  Public
router.get('/logout', (req, res) => {
  res.cookie(process.env.COOKIE_USER_TOKEN, { expires: Date.now() });
  res.status(200).send();
});

module.exports = router;
