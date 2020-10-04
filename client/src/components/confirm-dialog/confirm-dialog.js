import React, { Fragment, useRef, useEffect, useCallback } from 'react';
import { disableBodyScroll, enableBodyScroll } from '../../utils/bodyScroll';

import './confirm-dialog.css';

const ConfirmDialog = (props) => {
  const node = useRef();
  const { title, children, setOpen, onConfirm } = props;

  const handleClick = useCallback(
    (e) => {
      if (node.current.contains(e.target)) {
        return;
      }

      setOpen(false);
    },
    [node, setOpen]
  );

  useEffect(() => {
    disableBodyScroll();
    document.addEventListener('mousedown', handleClick);
    return () => {
      enableBodyScroll();
      document.removeEventListener('mousedown', handleClick);
    };
  }, [handleClick]);

  return (
    <Fragment>
      <div className='modal-container'>
        <div
          ref={node}
          className='confirm-dialog-container'
          onClose={() => setOpen(false)}
        >
          <h1 id='confirm-title'>{title}</h1>
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
