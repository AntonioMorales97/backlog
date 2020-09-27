import React, { Fragment } from 'react';

import './ticket-modal.css';

const TicketModalView = ({
  isOpen,
  openModal,
  closeModal,
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
    <Fragment>
      <div className='dark-overlay' />
      <div className='center'>
        <div ref={innerRef} className='ticket-form-container'>
          <div className='header-section'>
            <h2>Add ticket</h2>
            <h2 className='close-modal' onClick={closeModal}>
              &times;
            </h2>
          </div>
          <form className='form' onSubmit={onSubmit}>
            <textarea
              type='text'
              placeholder='Enter a description'
              name='description'
              onChange={onChange}
              required
              className='ticket-description'
            />
            <input
              type='submit'
              className='btn btn-primary'
              id='add-ticket-btn'
              value='Add'
            />
          </form>
        </div>
      </div>
    </Fragment>
  );
};

export default TicketModalView;
