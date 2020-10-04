import React from 'react';
import { Link } from 'react-router-dom';
import { ROLE_ADMIN } from '../../utils/constants';

import './ticket.css';

const TicketView = ({
  ticket,
  showRemoveConfirm,
  moveLeft,
  moveRight,
  user,
}) => {
  const adminTicketHeader = (
    <div className='ticket-header'>
      <div className='assignee'>{ticket.assignee}</div>
      <div>
        <Link to={`/ticket-info/${ticket._id}`} style={{ color: '#333' }}>
          <i className='fas fa-cog cog'></i>{' '}
        </Link>
        <i
          className='fas fa-trash-alt trash'
          onClick={() => showRemoveConfirm(true)}
        ></i>
      </div>
    </div>
  );

  let userTicketHeader = null;

  if (ticket.assignee) {
    userTicketHeader = (
      <div className='ticket-header'>
        <div className='assignee'>{ticket.assignee}</div>
      </div>
    );
  }

  return (
    <div className='ticket-container'>
      {user && user.role === ROLE_ADMIN ? adminTicketHeader : userTicketHeader}
      <div className='description'>{ticket.description}</div>
      <div className='arrows'>
        <div>
          {moveLeft && (
            <div
              className='arrow-container'
              onClick={() => moveLeft(ticket._id)}
            >
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
};

export default TicketView;
