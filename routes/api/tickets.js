const express = require('express');
const router = express.Router();
const { auth, authAdmin } = require('../../middleware/auth');
const checkObjectId = require('../../middleware/check-object-id');
const { OPEN, IN_PROGRESS, RESOLVED } = require('../../utils/constants');

// Models
const Ticket = require('../../models/Ticket');
const User = require('../../models/User');

const swedenTimeStamp = () => {
  return `${new Date().toLocaleString('se-SE', {
    timeZone: 'Europe/Stockholm',
  })}`;
};

const ticketUpdatedText = (userName, previousStatus, currentStatus) => {
  return `${swedenTimeStamp()}:  ${userName} moved ticket from ${previousStatus} to ${currentStatus}.`;
};

const ticketAddedText = (userName) => {
  return `${swedenTimeStamp()}: ${userName} created ticket.`;
};

const ticketAssignedText = (userName, assigneeName) => {
  return `${swedenTimeStamp()}: ${userName} assigned ticket to ${assigneeName}`;
};

const ticketAdminUpdatedText = (userName) => {
  return `${swedenTimeStamp()}: ${userName} updated ticket.`;
};

// @route   POST api/tickets
// @desc    Add new ticket
// @access  Private Admin
router.post('/', [auth], async (req, res) => {
  const { description, assignee } = req.body;

  if (!description || description.length === 0) {
    return res.status(400).json({ msg: 'Description is required.' });
  }

  try {
    const user = await User.findById(req.user.id).select('-password');

    const newTicket = new Ticket({
      description: req.body.description,
      user: req.user.id,
      status: OPEN,
      history: [{ event: ticketAddedText(user.name) }],
    });

    if (assignee.length > 0) {
      newTicket.assignee = assignee;
      newTicket.history.unshift({
        event: ticketAssignedText(user.name, assignee),
      });
    }

    const ticket = await newTicket.save();
    res.json(ticket);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route   GET api/tickets
// @desc    Get all tickets
// @access  Private All
router.get('/', [auth], async (req, res) => {
  try {
    const tickets = await Ticket.find()
      .select('-history')
      .sort({ registrationDate: -1 });
    res.json(tickets);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route   POST api/tickets/update-status
// @desc    Update status of a ticket
// @access  Private All
router.post(
  '/update-status/:id',
  [auth, checkObjectId('id')],
  async (req, res) => {
    const { status } = req.body;

    if (!status || status.length === 0) {
      return res.status(400).json({ msg: 'Status is required.' });
    }

    try {
      const { status } = req.body;
      if (!(status === OPEN || status === IN_PROGRESS || status === RESOLVED)) {
        return res.status(400).json({ msg: 'Invalid status' });
      }

      const ticket = await Ticket.findById(req.params.id);
      if (!ticket) {
        return res.status(404).json({ msg: 'Ticket does not exist' });
      }

      const prevStatus = ticket.status;
      ticket.status = status;
      ticket.history.unshift({
        event: ticketUpdatedText(req.user.name, prevStatus, status),
      });
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
// @access   Private Admin
router.delete('/:id', [authAdmin, checkObjectId('id')], async (req, res) => {
  try {
    const ticket = await Ticket.findById(req.params.id);

    if (!ticket) {
      return res.status(404).json({ msg: 'Ticket does not exist' });
    }

    /*
    if (ticket.user.toString() !== req.user.id) {
      return res.status(401).json({ msg: 'User not authorized' });
    }
    */

    await ticket.remove();
    return res.status(200).json({ msg: 'Ticket removed' });
  } catch (err) {
    console.error(err.message);
    return res.status(500).send('Server Error');
  }
});

// @route    GET api/tickets/:id
// @desc     Get ticket by id
// @access   Private Admin
router.get('/:id', [authAdmin, checkObjectId('id')], async (req, res) => {
  try {
    const ticket = await Ticket.findById(req.params.id);

    if (!ticket) {
      return res.status(404).json({ msg: 'Ticket does not exist' });
    }

    //if (ticket.user.toString() !== req.user.id) {
    //  return res.status(401).json({ msg: 'User not authorized' });
    //}

    return res.json(ticket);
  } catch (err) {
    console.error(err.message);
    return res.status(500).send('Server Error');
  }
});

// @route   POST api/tickets/:id/update
// @desc    Update ticket content
// @access  Private Admin
router.post(
  '/:id/update',
  [authAdmin, checkObjectId('id')],
  async (req, res) => {
    const { assignee, description } = req.body;

    if (!description || description.length === 0) {
      return res.status(400).json({ msg: 'Description is required.' });
    }

    try {
      const ticket = await Ticket.findById(req.params.id);
      if (!ticket) {
        return res.status(404).json({ msg: 'Ticket does not exist' });
      }

      ticket.assignee = assignee;
      ticket.description = description;

      ticket.history.unshift({
        event: ticketAdminUpdatedText(req.user.name),
      });
      await ticket.save();
      return res
        .status(200)
        .json({ msg: 'Ticket updated successfully', ticket });
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error');
    }
  }
);

module.exports = router;
