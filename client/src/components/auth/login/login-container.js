import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { login } from '../../../redux/actions';
import LoginView from './login-view';

class LoginContainer extends Component {
  state = {
    email: '',
    password: '',
  };

  onChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };

  onSubmit = (e) => {
    e.preventDefault();
    this.props.login(this.state.email, this.state.password);
  };

  render() {
    return (
      <LoginView
        email={this.state.email}
        password={this.state.password}
        onChange={this.onChange}
        onSubmit={this.onSubmit}
        isAuthenticated={this.props.isAuthenticated}
      />
    );
  }
}

LoginContainer.propTypes = {
  login: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool,
};

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
});

export default connect(mapStateToProps, { login })(LoginContainer);
