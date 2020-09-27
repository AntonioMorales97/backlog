import React, { Component } from 'react';
import { connect } from 'react-redux';
import { addTicket } from '../../redux/actions';
import TicketModalView from './ticket-modal-view';

class TicketModalContainer extends Component {
  state = {
    isOpen: false,
    description: '',
    isAdding: false,
  };

  openModal = (e) => {
    this.setState({ isOpen: true });
    document.addEventListener('mousedown', this.handleClickOutside);
  };

  closeModal = (e) => {
    this.setState({ isOpen: false });
    document.removeEventListener('mousedown', this.handleClickOutside);
  };

  handleClickOutside = (e) => {
    if (this.node.contains(e.target)) {
      return;
    }
    this.closeModal();
  };

  onChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };

  onSubmit = (e) => {
    e.preventDefault();
    if (this.state.isAdding) return;
    this.setState({ isAdding: true });
    this.props.addTicket(this.state.description);
    this.setState({ isAdding: false });
    this.closeModal();
  };

  render() {
    return (
      <TicketModalView
        innerRef={(node) => {
          this.node = node;
        }}
        isOpen={this.state.isOpen}
        openModal={this.openModal}
        closeModal={this.closeModal}
        onChange={this.onChange}
        onSubmit={this.onSubmit}
      />
    );
  }
}

const mapStateToProps = (state) => ({});

export default connect(mapStateToProps, { addTicket })(TicketModalContainer);
