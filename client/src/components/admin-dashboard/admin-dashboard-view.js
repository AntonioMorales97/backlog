import React, { Fragment } from 'react';
import Register from '../register';
import Users from '../users';
import ChangePassword from '../change-password';

import './admin-dashboard.css';

const AdminDashboardView = ({ user }) => {
  return (
    <Fragment>
      <div className='lead hide-sm'>Hello {user.name}, how is your day?</div>
      <div className='user-section'>
        <div className='col register p'>
          <Register />
        </div>
        <div className='col users p'>
          <Users />
        </div>
      </div>
      <div className='change-password p'>
        <ChangePassword />
      </div>
    </Fragment>
  );
};

export default AdminDashboardView;
