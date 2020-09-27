import api from '../utils/api';
import { v4 as uuidv4 } from 'uuid';
import {
  SET_TICKET_OPEN,
  SET_TICKET_IN_PROGRESS,
  SET_TICKET_RESOLVED,
  DELETE_TICKET,
  ADD_TICKET,
  USER_LOADED,
  AUTH_ERROR,
  SET_ALERT,
  REMOVE_ALERT,
  LOGIN_SUCCESS,
  LOGOUT,
  TICKET_ERROR,
  GET_TICKETS,
} from './actionTypes';
import { OPEN, IN_PROGRESS, RESOLVED } from '../utils/constants';

export const moveTicketToOpen = (id) => async (dispatch) => {
  try {
    await api.post(`/tickets/update-status/${id}`, { status: OPEN });

    dispatch({ type: SET_TICKET_OPEN, payload: { id } });
  } catch (err) {
    dispatch({
      type: TICKET_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

export const moveTicketToInProgress = (id) => async (dispatch) => {
  try {
    await api.post(`/tickets/update-status/${id}`, { status: IN_PROGRESS });

    dispatch({ type: SET_TICKET_IN_PROGRESS, payload: { id } });
  } catch (err) {
    dispatch({
      type: TICKET_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

export const moveTicketToResolved = (id) => async (dispatch) => {
  try {
    await api.post(`/tickets/update-status/${id}`, { status: RESOLVED });

    dispatch({ type: SET_TICKET_RESOLVED, payload: { id } });
  } catch (err) {
    dispatch({
      type: TICKET_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

export const removeTicket = (id) => async (dispatch) => {
  try {
    await api.delete(`/tickets/${id}`);

    dispatch({ type: DELETE_TICKET, payload: { id } });
  } catch (err) {
    dispatch({
      type: TICKET_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

export const getTickets = () => async (dispatch) => {
  try {
    const res = await api.get('/tickets');

    dispatch({
      type: GET_TICKETS,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: TICKET_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

export const addTicket = (description) => async (dispatch) => {
  try {
    const res = await api.post('/tickets', { description });

    dispatch({ type: ADD_TICKET, payload: res.data });

    dispatch(setAlert('Ticket added', 'success'));
  } catch (err) {
    dispatch({
      type: TICKET_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

export const setAlert = (msg, alertType, timeout = 5000) => (dispatch) => {
  const id = uuidv4();
  dispatch({
    type: SET_ALERT,
    payload: { msg, alertType, id },
  });
  setTimeout(() => dispatch({ type: REMOVE_ALERT, payload: id }), timeout);
};

export const loadUser = () => async (dispatch) => {
  try {
    const res = await api.get('/auth');
    dispatch({
      type: USER_LOADED,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: AUTH_ERROR,
    });
  }
};

export const login = (email, password) => async (dispatch) => {
  if (!email || !password) {
    dispatch(setAlert('Please enter the required fields.', 'danger'));
    return;
  }

  const body = { email, password };

  try {
    const res = await api.post('/auth', body);

    dispatch({ type: LOGIN_SUCCESS, payload: res.data });

    dispatch(loadUser());
  } catch (err) {
    const errors = err.response.data.errors;

    if (errors) {
      errors.forEach((error) => dispatch(setAlert(error.msg, 'danger')));
    }

    dispatch({ type: AUTH_ERROR });
  }
};

export const logout = () => ({ type: LOGOUT });
