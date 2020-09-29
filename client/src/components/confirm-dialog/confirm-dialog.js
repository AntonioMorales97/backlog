import React, { Fragment } from 'react';

import './confirm-dialog.css';

const ConfirmDialog = (props) => {
  const { title, children, setOpen, onConfirm } = props;
  return (
    <Fragment>
      <div className='dark-overlay' />
      <div className='center-screen'>
        <div
          className='confirm-dialog-container'
          onClose={() => setOpen(false)}
        >
          <h1>{title}</h1>
          <div>{children}</div>
          <div className='action-section'>
            <button
              className='btn btn-danger'
              onClick={() => {
                setOpen(false);
                onConfirm();
              }}
            >
              Yes
            </button>
            <button className='btn btn-primary' onClick={() => setOpen(false)}>
              No
            </button>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default ConfirmDialog;
