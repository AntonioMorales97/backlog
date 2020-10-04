import React, { Component } from 'react';
import ChangePasswordView from './change-password-view';
import { connect } from 'react-redux';
import { changePassword } from '../../redux/actions';

class ChangePasswordContainer extends Component {
  state = {
    oldPassword: '',
    newPassword: '',
    rePassword: '',
    isChanging: false,
  };

  onChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };

  onSubmit = (e) => {
    e.preventDefault();
    if (this.state.isChanging) return;
    this.setState({ isChanging: true });
    if (this.state.newPassword !== this.state.rePassword) {
      this.props.setAlert('Passwords do not match!', 'danger');
      this.setState({ isChanging: false });
      return;
    }
    this.props.changePassword(this.state.oldPassword, this.state.newPassword);
    this.setState({
      isChanging: false,
      oldPassword: '',
      newPassword: '',
      rePassword: '',
    });
  };

  render() {
    return (
      <ChangePasswordView
        onChange={this.onChange}
        onSubmit={this.onSubmit}
        oldPassword={this.state.oldPassword}
        newPassword={this.state.newPassword}
        rePassword={this.state.rePassword}
      />
    );
  }
}

const mapStateToProps = (state) => ({});

export default connect(mapStateToProps, { changePassword })(
  ChangePasswordContainer
);
