import React from 'react';

import './ticket.css';

const TicketView = ({ ticket, removeTicket, moveLeft, moveRight }) => (
  <div className='ticket-container'>
    <div className='ticket-header'>
      <div className='author'>{ticket.author}</div>
      <div className='delete' onClick={() => removeTicket(ticket._id)}>
        &times;
      </div>
    </div>
    <div className='description'>{ticket.description}</div>
    <div className='arrows'>
      <div>
        {moveLeft && (
          <div className='arrow-container' onClick={() => moveLeft(ticket._id)}>
            <i className='fas fa-angle-left'></i>
          </div>
        )}
      </div>
      <div>
        {moveRight && (
          <div
            className='arrow-container right'
            onClick={() => moveRight(ticket._id)}
          >
            <i className='fas fa-angle-right'></i>
          </div>
        )}
      </div>
    </div>
  </div>
);

export default TicketView;
