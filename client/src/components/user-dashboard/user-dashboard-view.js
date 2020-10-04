import React, { Fragment } from 'react';

import ChangePassword from '../change-password';

const UserDashboardView = ({ user }) => {
  return (
    <Fragment>
      <div className='lead hide-sm'>Hello {user.name}, how is your day?</div>
      <ChangePassword />
    </Fragment>
  );
};

export default UserDashboardView;
