import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { removeTicket } from '../../redux/actions';
import ConfirmDialog from '../confirm-dialog';
import TicketView from './ticket-view';

class TicketContainer extends Component {
  state = {
    showConfirm: false,
  };

  removeTicket = () => {
    this.setState({ showConfirm: false });
    this.props.removeTicket(this.props.ticket._id);
  };

  showConfirmDialog = (show) => {
    if (show === true) {
      this.setState({ showConfirm: true });
      return;
    }
    this.setState({ showConfirm: false });
  };

  render() {
    return (
      <Fragment>
        {this.state.showConfirm ? (
          <ConfirmDialog
            setOpen={this.showConfirmDialog}
            title={'Are you sure you want to delete this ticket?'}
            onConfirm={this.removeTicket}
          />
        ) : null}
        <TicketView
          user={this.props.auth.user}
          ticket={this.props.ticket}
          showRemoveConfirm={this.showConfirmDialog}
          moveLeft={this.props.moveLeft}
          moveRight={this.props.moveRight}
        />
      </Fragment>
    );
  }
}

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps, {
  removeTicket,
})(TicketContainer);
