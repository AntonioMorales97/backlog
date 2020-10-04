import React, { Fragment } from 'react';
import { ROLE_ADMIN } from '../../utils/constants';

import './users.css';

const UsersView = ({
  users,
  isLoading,
  showDeleteConfirm,
  toggleActiveStatus,
}) => {
  if (isLoading) {
    return <p>Loading...</p>;
  }
  return (
    <Fragment>
      <h1 className='lead'>Users</h1>
      {users && users.length ? (
        users.map((user, index) => {
          return (
            <Fragment key={user._id}>
              <p>
                {user.name}{' '}
                {user.role !== ROLE_ADMIN ? (
                  <Fragment>
                    <i
                      className='fas fa-user active'
                      style={{ color: user.active ? '#28a745' : '#343a40' }}
                      title={`${
                        user.active ? 'User is active.' : 'User is not active.'
                      } Click to toggle status.`}
                      onClick={() => toggleActiveStatus(user._id)}
                    ></i>{' '}
                    <i
                      className='fas fa-trash-alt trash'
                      onClick={() => showDeleteConfirm(true, user._id)}
                    ></i>{' '}
                  </Fragment>
                ) : (
                  <i
                    className='fas fa-user-shield'
                    title='This user is an admin'
                  ></i>
                )}
              </p>
              <hr />
            </Fragment>
          );
        })
      ) : (
        <p>Empty</p>
      )}
    </Fragment>
  );
};

export default UsersView;
