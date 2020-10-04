import React, { Component } from 'react';
import { connect } from 'react-redux';
import AdminDashboardView from './admin-dashboard-view';

class AdminDashboardContainer extends Component {
  render() {
    return <AdminDashboardView user={this.props.auth.user} />;
  }
}

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps, {})(AdminDashboardContainer);
