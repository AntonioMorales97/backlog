import React, { Component } from 'react';
import { connect } from 'react-redux';
import { addTicket } from '../../redux/actions';
import { disableBodyScroll, enableBodyScroll } from '../../utils/bodyScroll';
import TicketModalView from './ticket-modal-view';

class TicketModalContainer extends Component {
  state = {
    isOpen: false,
    assignee: '',
    description: '',
    isAdding: false,
  };

  openModal = (e) => {
    this.setState({ isOpen: true });
    disableBodyScroll();
    document.addEventListener('mousedown', this.handleClickOutside);
  };

  closeModal = (e) => {
    this.setState({ isOpen: false });
    enableBodyScroll();
    document.removeEventListener('mousedown', this.handleClickOutside);
  };

  componentWillUnmount() {
    document.removeEventListener('mousedown', this.handleClickOutside);
  }

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
    this.props.addTicket(this.state.description, this.state.assignee);
    this.setState({ isAdding: false, assignee: '', description: '' });
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
        assignee={this.state.assignee}
        description={this.state.description}
      />
    );
  }
}

const mapStateToProps = (state) => ({});

export default connect(mapStateToProps, { addTicket })(TicketModalContainer);
