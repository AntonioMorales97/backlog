const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator');
const auth = require('../../middleware/auth');
const checkObjectId = require('../../middleware/check-object-id');
const { OPEN, IN_PROGRESS, RESOLVED } = require('../../utils/constants');

// Models
const Ticket = require('../../models/Ticket');
const User = require('../../models/User');

// @route   POST api/tickets
// @desc    Add new ticket
// @access  Private
router.post(
  '/',
  [auth, [check('description', 'Description is required').not().isEmpty()]],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      const user = await User.findById(req.user.id).select('-password');

      const newTicket = new Ticket({
        description: req.body.description,
        author: user.name,
        user: req.user.id,
        status: OPEN,
      });

      const ticket = await newTicket.save();
      res.json(ticket);
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error');
    }
  }
);

// @route   GET api/tickets
// @desc    Get all tickets
// @access  Private
router.get('/', [auth], async (req, res) => {
  try {
    const tickets = await Ticket.find().sort({ registrationDate: -1 });
    res.json(tickets);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route   PUT api/tickets/update-status
// @desc    Update status of a ticket
// @access  Private
router.post(
  '/update-status/:id',
  [
    auth,
    checkObjectId('id'),
    [check('status', 'A status must be given!').not().isEmpty()],
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      const { status } = req.body;
      if (!(status === OPEN || status === IN_PROGRESS || status === RESOLVED)) {
        return res.status(400).json({ errors: [{ msg: 'Invalid status' }] });
      }

      const ticket = await Ticket.findById(req.params.id);
      if (!ticket) {
        return res
          .status(400)
          .json({ errors: [{ msg: 'Ticket does not exist' }] });
      }

      ticket.status = status;
      await ticket.save();
      return res.status(200).json({ msg: 'Ticket status updated' });
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error');
    }
  }
);

// @route    DELETE api/tickets/:id
// @desc     Delete ticket
// @access   Private
router.delete('/:id', [auth, checkObjectId('id')], async (req, res) => {
  try {
    const ticket = await Ticket.findById(req.params.id);

    if (!ticket) {
      return res
        .status(404)
        .json({ errors: [{ msg: 'Ticket does not exist' }] });
    }

    if (ticket.user.toString() !== req.user.id) {
      return res.status(401).json({ errors: [{ msg: 'User not authorized' }] });
    }

    await ticket.remove();
    return res.status(200).json({ msg: 'Ticket removed' });
  } catch (err) {
    console.error(err.message);
    return res.status(500).send('Server Error');
  }
});

module.exports = router;
