import {
  ADD_TICKET,
  SET_TICKET_OPEN,
  SET_TICKET_IN_PROGRESS,
  SET_TICKET_RESOLVED,
  DELETE_TICKET,
  GET_TICKETS,
  TICKET_ERROR,
} from '../actionTypes';
import { OPEN, IN_PROGRESS, RESOLVED } from '../../utils/constants';

const initialState = {
  tickets: [],
  ticket: null,
  loading: true,
  error: {},
};

export default function (state = initialState, action) {
  switch (action.type) {
    case GET_TICKETS: {
      return {
        ...state,
        tickets: action.payload,
        loading: false,
      };
    }
    case ADD_TICKET: {
      return {
        ...state,
        tickets: [action.payload, ...state.tickets],
        loading: false,
      };
    }
    case SET_TICKET_OPEN: {
      const { id } = action.payload;
      const idx = state.tickets.findIndex((ticket) => ticket._id === id);
      if (idx === -1) {
        return { ...state };
      }
      let updatedTickets = [...state.tickets];
      updatedTickets[idx] = { ...updatedTickets[idx], status: OPEN };
      return {
        ...state,
        tickets: updatedTickets,
        loading: false,
      };
    }
    case SET_TICKET_IN_PROGRESS: {
      const { id } = action.payload;
      const idx = state.tickets.findIndex((ticket) => ticket._id === id);
      if (idx === -1) {
        return { ...state };
      }
      let updatedTickets = [...state.tickets];
      updatedTickets[idx] = { ...updatedTickets[idx], status: IN_PROGRESS };
      return {
        ...state,
        tickets: updatedTickets,
        loading: false,
      };
    }
    case SET_TICKET_RESOLVED: {
      const { id } = action.payload;
      const idx = state.tickets.findIndex((ticket) => ticket._id === id);
      if (idx === -1) {
        return { ...state };
      }
      let updatedTickets = [...state.tickets];
      updatedTickets[idx] = { ...updatedTickets[idx], status: RESOLVED };
      return {
        ...state,
        tickets: updatedTickets,
        loading: false,
      };
    }
    case DELETE_TICKET: {
      const { id } = action.payload;
      return {
        ...state,
        tickets: state.tickets.filter((ticket) => ticket._id !== id),
        loading: false,
      };
    }
    case TICKET_ERROR: {
      return {
        ...state,
        error: action.payload,
        loading: false,
      };
    }
    default:
      return state;
  }
}
