import React, { Component } from 'react';
import { connect } from 'react-redux';
import UserDashboardView from './user-dashboard-view';

class UserDashboardContainer extends Component {
  render() {
    return <UserDashboardView user={this.props.auth.user} />;
  }
}

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps, {})(UserDashboardContainer);
