import { combineReducers } from 'redux';
import tickets from './tickets';
import auth from './auth';
import alerts from './alerts';
import users from './users';

export default combineReducers({ auth, tickets, alerts, users });
