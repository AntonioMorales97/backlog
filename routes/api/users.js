const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const checkObjectId = require('../../middleware/check-object-id');
const { auth, authAdmin } = require('../../middleware/auth');
const { ROLE_USER, ROLE_ADMIN } = require('../../utils/constants');
const { check, validationResult } = require('express-validator');

const User = require('../../models/User');

// @route    POST api/users
// @desc     Register user
// @access   Private Admin
router.post(
  '/',
  [
    authAdmin,
    [
      check('name', 'Name is required').not().isEmpty(),
      check('email', 'Please include a valid email').isEmail(),
      check(
        'password',
        'Please enter a password with 6 or more characters'
      ).isLength({ min: 6 }),
    ],
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { name, email, password } = req.body;

    try {
      let user = await User.findOne({ email });

      if (user) {
        return res
          .status(400)
          .json({ errors: [{ msg: 'User already exists' }] });
      }

      user = new User({
        name,
        email,
        password,
        role: ROLE_USER,
        active: true,
      });

      const salt = await bcrypt.genSalt(10);

      user.password = await bcrypt.hash(password, salt);

      await user.save();

      const savedUser = {
        _id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
        active: user.active,
        registrationDate: user.registrationDate,
        __v: user.__v,
      };

      res.json({ msg: 'User registered successfully', user: savedUser });
      /*
      const payload = {
        user: {
          id: user.id,
        },
      };
      jwt.sign(
        payload,
        config.get('jwtSecret'),
        { expiresIn: '5 days' },
        (err, token) => {
          if (err) throw err;
          res.json({ token });
        }
      );
      */
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error');
    }
  }
);

router.get('/', [authAdmin], async (req, res) => {
  try {
    const users = await User.find().select('-password').sort({ name: 'asc' });
    res.json(users);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route    POST api/users/change-password
// @desc     Change password
// @access   Private All
router.post('/change-password', [auth], async (req, res) => {
  const { oldPassword, newPassword } = req.body;

  if (!oldPassword || !newPassword) {
    return res.status(400).json({ msg: 'Enter required fields' });
  }

  if (oldPassword.length < 6 || oldPassword.length < 6) {
    return res
      .status(400)
      .json({ msg: 'Password must be at least 6 characters' });
  }

  try {
    const user = await User.findById(req.user.id);

    if (!user) {
      return res.status(404).json({
        msg: 'User was not found. Please contact support.',
      });
    }

    const isMatch = await bcrypt.compare(oldPassword, user.password);

    if (!isMatch) {
      return res.status(400).json({ msg: 'Wrong password' });
    }

    const salt = await bcrypt.genSalt(10);

    user.password = await bcrypt.hash(newPassword, salt);

    await user.save();
    return res.status(200).json({ msg: 'Password changed' });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route    DELETE api/users/:id
// @desc     Delete ticket
// @access   Private Admin
router.delete('/:id', [authAdmin, checkObjectId('id')], async (req, res) => {
  try {
    const user = await User.findById(req.params.id);

    if (!user) {
      return res.status(404).json({ msg: 'User does not exist' });
    }

    if (user.role === ROLE_ADMIN) {
      return res.status(400).json({
        msg:
          'You cannot delete an admin from here. Contact system responsible.',
      });
    }

    await user.remove();
    return res.status(200).json({ msg: 'User deleted' });
  } catch (err) {
    console.error(err.message);
    return res.status(500).send('Server Error');
  }
});

// @route    DELETE api/users/:id/toggle-active
// @desc     Toggle active status of user
// @access   Private Admin
router.put(
  '/:id/toggle-active',
  [authAdmin, checkObjectId('id')],
  async (req, res) => {
    try {
      const user = await User.findById(req.params.id);

      if (!user) {
        return res.status(404).json({ msg: 'User does not exist' });
      }

      if (user.role === ROLE_ADMIN) {
        return res.status(400).json({
          msg:
            'You cannot toggle the active status of an admin from here. Contact system responsible.',
        });
      }

      user.active = !user.active;
      await user.save();
      return res
        .status(200)
        .json({ msg: `User's status was set to ${user.active}` });
    } catch (err) {
      console.error(err.message);
      return res.status(500).send('Server Error');
    }
  }
);

// @route    POST api/users/admin
// @desc     Register admin
// @access   None
/*
router.post('/admin', async (req, res) => {
  const { name, email, password } = req.body;

  try {
    let user = await User.findOne({ email });

    if (user) {
      return res.status(400).json({ errors: [{ msg: 'User already exists' }] });
    }

    user = new User({
      name,
      email,
      password,
      role: ROLE_ADMIN,
      active: true,
    });

    const salt = await bcrypt.genSalt(10);

    user.password = await bcrypt.hash(password, salt);

    await user.save();

    const savedUser = {
      _id: user.id,
      name: user.name,
      email: user.email,
      role: user.role,
      active: user.active,
      registrationDate: user.registrationDate,
      __v: user.__v,
    };

    res.json({ msg: 'User registered successfully', user: savedUser });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});
*/

module.exports = router;
