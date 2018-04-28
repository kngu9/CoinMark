import { combineReducers } from "redux";
import crypto from './crypto';
import portfolio from './portfolio';

// Combine reducers
const itemApp = combineReducers({
  crypto,
  portfolio
});

export default itemApp;