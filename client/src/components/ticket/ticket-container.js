import React from 'react';
import { connect } from 'react-redux';
import { removeTicket } from '../../redux/actions';
import TicketView from './ticket-view';

const TicketContainer = ({ ticket, removeTicket, moveLeft, moveRight }) => (
  <TicketView
    ticket={ticket}
    removeTicket={removeTicket}
    moveLeft={moveLeft}
    moveRight={moveRight}
  />
);

export default connect(null, {
  removeTicket,
})(TicketContainer);
