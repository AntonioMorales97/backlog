import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import {
  getAllUsers,
  deleteUser,
  toggleActiveStatus,
} from '../../redux/actions';
import { getUsersList } from '../../redux/selectors';
import ConfirmDialog from '../confirm-dialog';
import UsersView from './users-view';

class UsersContainer extends Component {
  state = {
    showConfirm: false,
    id: '',
  };

  componentDidMount() {
    this.props.getAllUsers();
  }

  deleteUser = (id) => {
    this.setState({ showConfirm: false, id: '' });
    this.props.deleteUser(id);
  };

  showConfirmDialog = (show, id) => {
    if (show === true) {
      this.setState({ showConfirm: true, id });
      return;
    }
    this.setState({ showConfirm: false, id: '' });
  };

  render() {
    return (
      <Fragment>
        {this.state.showConfirm ? (
          <ConfirmDialog
            setOpen={this.showConfirmDialog}
            title={'Are you sure you want to delete this user?'}
            onConfirm={() => this.deleteUser(this.state.id)}
          />
        ) : null}
        <UsersView
          users={this.props.users}
          isLoading={this.props.isLoading}
          showDeleteConfirm={this.showConfirmDialog}
          toggleActiveStatus={this.props.toggleActiveStatus}
        />
      </Fragment>
    );
  }
}

const mapStateToProps = (state) => {
  const users = getUsersList(state);
  const isLoading = state.users.isLoading;
  return { users, isLoading };
};

export default connect(mapStateToProps, {
  getAllUsers,
  deleteUser,
  toggleActiveStatus,
})(UsersContainer);
