import React from 'react';

import './ticket-modal.css';

const TicketModalView = ({
  isOpen,
  openModal,
  closeModal,
  assignee,
  description,
  innerRef,
  onChange,
  onSubmit,
}) => {
  if (!isOpen) {
    return (
      <button
        id='open-modal-btn'
        className='btn btn-primary'
        onClick={openModal}
      >
        +
      </button>
    );
  }
  return (
    <div className='modal-container'>
      <div ref={innerRef} className='ticket-form-container'>
        <h1 className='lead text-primary'>
          <i className='fas fa-ticket-alt' /> Add Ticket
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
          <input type='submit' className='btn btn-primary w-100' value='Add' />
        </form>
        <button className='btn btn-danger w-100 mt-1' onClick={closeModal}>
          Close
        </button>
      </div>
    </div>
  );
};

export default TicketModalView;
