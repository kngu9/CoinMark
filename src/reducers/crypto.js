import actionTypes from '../actions';

const initialState = {
  lastReloaded: new Date(),
  isLoading: false,
  data: []
};

export default (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.UPDATE_CRYPTO_DATA:
      return { ...state, data: action.newData, lastReloaded: new Date() };
    default:
      return state;
  }
};