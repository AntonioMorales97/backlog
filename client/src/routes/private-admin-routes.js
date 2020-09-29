import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';
import { ROLE_ADMIN } from '../utils/constants';
import { connect } from 'react-redux';

const PrivateAdminRoute = ({
  component: Component,
  auth: { isAuthenticated, loading, user },
  ...rest
}) => (
  <Route
    {...rest}
    render={(props) =>
      loading ? (
        <h1>Loading</h1>
      ) : isAuthenticated && user.role === ROLE_ADMIN ? (
        <Component {...props} />
      ) : (
        <Redirect to='/login' />
      )
    }
  ></Route>
);

PrivateAdminRoute.propTypes = {
  auth: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps)(PrivateAdminRoute);
