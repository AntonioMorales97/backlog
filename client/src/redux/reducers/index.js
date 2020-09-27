import { combineReducers } from 'redux';
import tickets from './tickets';
import auth from './auth';
import alerts from './alerts';

export default combineReducers({ auth, tickets, alerts });
