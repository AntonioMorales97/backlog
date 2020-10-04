import React, { Component } from 'react';
import TicketInfoView from './ticket-info-view';
import { connect } from 'react-redux';
import { getTicket, updateTicket } from '../../redux/actions';

class TicketInfoContainer extends Component {
  state = {
    assignee: '',
    description: '',
    isInit: false,
    isUpdating: false,
  };

  componentDidMount() {
    this.props.getTicket(this.props.match.params.id);
  }

  componentDidUpdate() {
    if (!this.state.isInit) {
      if (this.props.ticket) {
        this.setState({
          assignee: this.props.ticket.assignee,
          description: this.props.ticket.description,
          isInit: true,
        });
      }
    }
  }

  onChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };

  onSubmit = (e) => {
    e.preventDefault();
    if (this.state.isUpdating) return;
    this.setState({ isUpdating: true });
    this.props.updateTicket({
      assignee: this.state.assignee,
      description: this.state.description,
      id: this.props.ticket._id,
    });
    this.setState({ isUpdating: false });
  };

  goBack = () => {
    this.props.history.goBack();
  };

  render() {
    return (
      <TicketInfoView
        ticket={this.props.ticket}
        goBack={this.goBack}
        onSubmit={this.onSubmit}
        onChange={this.onChange}
        assignee={this.state.assignee}
        description={this.state.description}
      />
    );
  }
}

const mapStateToProps = (state) => ({
  ticket: state.tickets.ticket,
});

export default connect(mapStateToProps, {
  getTicket,
  updateTicket,
})(TicketInfoContainer);
