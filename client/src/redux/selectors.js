import { OPEN, IN_PROGRESS, RESOLVED } from '../utils/constants';

export const getTicketsState = (store) => store.tickets;

export const getTicketsList = (store) =>
  getTicketsState(store) ? getTicketsState(store).tickets : [];

export const getTicketById = (store, id) => {
  const ticketState = getTicketsState(store);
  if (ticketState) {
    const ticketsList = getTicketsList(store);
    const idx = ticketsList.findIndex((ticket) => ticket._id === id);
    if (idx === -1) {
      return {};
    } else {
      return { ...ticketsList[idx] };
    }
  } else {
    return {};
  }
};

export const getOpenTickets = (store) =>
  getTicketsList(store).filter((ticket) => ticket.status === OPEN);

export const getInProgressTickets = (store) =>
  getTicketsList(store).filter((ticket) => ticket.status === IN_PROGRESS);

export const getResolvedTickets = (store) =>
  getTicketsList(store).filter((ticket) => ticket.status === RESOLVED);
