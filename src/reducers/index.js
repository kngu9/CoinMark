import { combineReducers } from "redux";
import crypto from './crypto';

// Combine reducers
const itemApp = combineReducers({
  crypto
});

export default itemApp;