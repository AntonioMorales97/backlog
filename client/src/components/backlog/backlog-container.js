import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  getOpenTickets,
  getInProgressTickets,
  getResolvedTickets,
} from '../../redux/selectors';
import {
  moveTicketToOpen,
  moveTicketToInProgress,
  moveTicketToResolved,
  getTickets,
} from '../../redux/actions';
import BacklogView from './backlog-view';

class BacklogContainer extends Component {
  componentDidMount() {
    this.props.getTickets();
  }

  render() {
    return (
      <BacklogView
        open={this.props.openTickets}
        inProgress={this.props.inProgressTickets}
        resolved={this.props.resolvedTickets}
        moveTicketToOpen={this.props.moveTicketToOpen}
        moveTicketToInProgress={this.props.moveTicketToInProgress}
        moveTicketToResolved={this.props.moveTicketToResolved}
      />
    );
  }
}

const mapStateToProps = (state) => {
  const openTickets = getOpenTickets(state);
  const inProgressTickets = getInProgressTickets(state);
  const resolvedTickets = getResolvedTickets(state);
  return { openTickets, inProgressTickets, resolvedTickets };
};

export default connect(mapStateToProps, {
  moveTicketToOpen,
  moveTicketToInProgress,
  moveTicketToResolved,
  getTickets,
})(BacklogContainer);
