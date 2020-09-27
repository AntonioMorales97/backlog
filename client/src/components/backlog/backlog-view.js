import React, { Fragment } from 'react';
import Ticket from '../ticket';
import TicketModal from '../ticket-modal';

import './backlog.css';

const BacklogView = ({
  open,
  inProgress,
  resolved,
  moveTicketToOpen,
  moveTicketToInProgress,
  moveTicketToResolved,
}) => {
  return (
    <Fragment>
      <div className='backlog-container'>
        <div className='backlog-section'>
          <h1>Open</h1>
          <div className='ticket-section'>
            {open && open.length ? (
              open.map((ticket, index) => {
                return (
                  <Ticket
                    key={ticket._id}
                    ticket={ticket}
                    moveRight={moveTicketToInProgress}
                  />
                );
              })
            ) : (
              <div>Empty</div>
            )}
          </div>
        </div>
        <div className='backlog-section'>
          <h1>In Progress</h1>
          <div className='ticket-section'>
            {inProgress && inProgress.length ? (
              inProgress.map((ticket, index) => {
                return (
                  <Ticket
                    key={ticket._id}
                    ticket={ticket}
                    moveLeft={moveTicketToOpen}
                    moveRight={moveTicketToResolved}
                  />
                );
              })
            ) : (
              <div>Empty</div>
            )}
          </div>
        </div>
        <div className='backlog-section'>
          <h1>Resolved</h1>
          <div className='ticket-section'>
            {resolved && resolved.length ? (
              resolved.map((ticket, index) => {
                return (
                  <Ticket
                    key={ticket._id}
                    ticket={ticket}
                    moveLeft={moveTicketToInProgress}
                  />
                );
              })
            ) : (
              <div>Empty</div>
            )}
          </div>
        </div>
      </div>
      <TicketModal />
    </Fragment>
  );
};

export default BacklogView;
