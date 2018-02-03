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
    case actionTypes.SET_CRYPTO_LOADING:
      return { ...state, isLoading: action.loading };
    default:
      return state;
  }
};