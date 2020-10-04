import React, { Fragment } from 'react';

import './ticket-info.css';

const TicketInfoView = ({
  goBack,
  ticket,
  onSubmit,
  onChange,
  assignee,
  description,
}) => {
  if (!ticket) {
    return (
      <Fragment>
        <div className='btn' onClick={goBack}>
          Go back
        </div>
        <br />
        <h2>Loading...</h2>
      </Fragment>
    );
  }
  return (
    <Fragment>
      <div className='btn btn-primary' onClick={goBack}>
        Go back
      </div>
      <hr />
      <h1 className='lead text-primary'>
        <i className='fas fa-ticket-alt' /> Update Ticket
      </h1>
      <form className='form' onSubmit={onSubmit}>
        <div className='form-group'>
          <input
            type='text'
            placeholder='Assignee name (optional)'
            name='assignee'
            onChange={onChange}
            value={assignee}
          />
        </div>
        <div className='form-group'>
          <textarea
            className='ticket-description'
            placeholder='Enter a description'
            name='description'
            onChange={onChange}
            value={description}
            required
          />
        </div>
        <input type='submit' className='btn btn-primary w-100' value='Update' />
      </form>
      <hr />
      <h1 className='lead text-primary'>
        <i className='fas fa-history' /> History
      </h1>
      <div className='history'>
        {ticket.history.length ? (
          ticket.history.map((history, index) => {
            return (
              <p key={history._id} className='event'>
                {history.event}
              </p>
            );
          })
        ) : (
          <h2>Empty</h2>
        )}
      </div>
    </Fragment>
  );
};

export default TicketInfoView;
