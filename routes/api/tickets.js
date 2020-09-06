const express = require('express');
const router = express.Router();
const auth = require('../../middleware/auth');
const { status } = require('../../utils/constants');

// Models
const Ticket = require('../../models/Ticket');

// @route   POST api/tickets
// @desc    Add new ticket
// @access  Private
router.post('/', [auth], (req, res) => {
  const { description } = req.body;
  if (!description) {
    return res.status(400).json({ msg: 'You must enter a description!' });
  }

  const { user } = req;
  const ticket = new Ticket({
    _userId: user.id,
    description,
    status: status.OPEN,
  });

  ticket
    .save()
    .then((savedTicket) => res.status(200).json({ ticket: savedTicket }))
    .catch((err) =>
      res
        .status(500)
        .json({ msg: 'Something went wrong when trying to add the new ticket' })
    );
});

// @route   GET api/tickets
// @desc    Get all tickets
// @access  Private
router.get('/', [auth], (req, res) => {
  Ticket.find({})
    .then((tickets) => {
      return res.status(200).json({ tickets });
    })
    .catch((err) =>
      res.status(500).json({
        msg: 'Something went wrong when trying to get all the tickets',
      })
    );
});

// @route   POST api/tickets/update-status
// @desc    Update status of a ticket
// @access  Private
router.post('/update-status', [auth], (req, res) => {
  const { ticketId, newStatus } = req.body;
  if (!newStatus) {
    return res.status(400).json({ msg: 'You must enter a status' });
  }

  if (
    !(
      newStatus === status.OPEN ||
      newStatus === status.RESOLVED ||
      newStatus === status.IN_PROGRESS
    )
  ) {
    return res.status(400).json({
      msg:
        'Status not supported. Currently supported status are: Open, In Progress, Resolved',
    });
  }

  Ticket.findById(ticketId, (err, foundTicket) => {
    if (!foundTicket) {
      return res
        .status(404)
        .json({ msg: 'Could not find a ticket with the given id' });
    }

    if (foundTicket.status === newStatus) {
      return res.status(400).json({ msg: 'The ticket has the same status' });
    }

    foundTicket.status = newStatus;

    foundTicket
      .save()
      .then((savedTicket) => res.status(200).json({ ticket: savedTicket }))
      .catch((err) =>
        res.status(500).json({
          msg: 'Something went wrong when trying to save the modified ticket',
        })
      );
  });
});

module.exports = router;
