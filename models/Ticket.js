const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const TicketSchema = new Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'User',
  },
  description: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    required: true,
  },
  assignee: {
    type: String,
  },
  history: [
    {
      event: {
        type: String,
        required: true,
      },
    },
  ],
  registrationDate: {
    type: Date,
    required: true,
    default: Date.now,
  },
});

module.exports = Ticket = mongoose.model('ticket', TicketSchema);
