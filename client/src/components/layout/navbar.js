import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { logout } from '../../redux/actions';
import { ROLE_ADMIN } from '../../utils/constants';

import './navbar.css';

const Navbar = ({ auth: { isAuthenticated, user }, logout }) => {
  const logoutListItem = (
    <li>
      <a onClick={logout} href='#!'>
        <i className='fas fa-sign-out-alt' />{' '}
        <span className='hide-sm'>Logout</span>
      </a>
    </li>
  );

  const backlogListItem = (
    <li>
      <Link to='/backlog'>
        <i className='fas fa-clipboard-list' />{' '}
        <span className='hide-sm'>Backlog</span>
      </Link>
    </li>
  );

  const userLinks = (
    <ul>
      <li>
        <Link to='/user'>
          <i className='fas fa-user' /> <span className='hide-sm'>User</span>
        </Link>
      </li>
      {backlogListItem}
      {logoutListItem}
    </ul>
  );

  const adminLinks = (
    <ul>
      <li>
        <Link to='/admin'>
          <i className='fas fa-user-shield' />{' '}
          <span className='hide-sm'>Admin</span>
        </Link>
      </li>
      {backlogListItem}
      {logoutListItem}
    </ul>
  );

  const guestLinks = (
    <ul>
      <li>
        <Link to='/login'>Login</Link>
      </li>
    </ul>
  );

  return (
    <nav className='navbar bg-dark'>
      <h1>
        <Link to='/'>
          <i className='fas fa-code' /> Simple Backlog
        </Link>
      </h1>
      <Fragment>
        {isAuthenticated
          ? user && user.role === ROLE_ADMIN
            ? adminLinks
            : userLinks
          : guestLinks}
      </Fragment>
    </nav>
  );
};

Navbar.propTypes = {
  logout: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps, { logout })(Navbar);
