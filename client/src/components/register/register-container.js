import React, { Component } from 'react';
import RegisterView from './register-view';
import { connect } from 'react-redux';
import { registerUser, setAlert } from '../../redux/actions';

class RegisterContainer extends Component {
  state = {
    name: '',
    email: '',
    password: '',
    rePassword: '',
    isRegistering: false,
  };

  resetRegisterUser = () => {
    this.setState({
      name: '',
      email: '',
      password: '',
      rePassword: '',
    });
  };

  onChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };

  onSubmit = (e) => {
    e.preventDefault();
    if (this.state.isRegistering) return;
    this.setState({ isRegistering: true });
    if (this.state.password !== this.state.rePassword) {
      this.props.setAlert('Passwords do not match!', 'danger');
      this.setState({ isRegistering: false });
      return;
    }
    this.props.registerUser({
      name: this.state.name,
      email: this.state.email,
      password: this.state.password,
    });
    this.setState({ isRegistering: false });
    this.resetRegisterUser();
  };

  render() {
    return (
      <RegisterView
        onChange={this.onChange}
        onSubmit={this.onSubmit}
        email={this.state.email}
        name={this.state.name}
        password={this.state.password}
        rePassword={this.state.rePassword}
      />
    );
  }
}

const mapStateToProps = (state) => ({});

export default connect(mapStateToProps, { registerUser, setAlert })(
  RegisterContainer
);
