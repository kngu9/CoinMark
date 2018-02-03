import actionTypes from '../actions';

const initialState = {
  lastReloaded: new Date(),
  pageNumber: 0,
  isLoading: false,
  data: []
};

export default (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.UPDATE_CRYPTO_DATA:
      return { ...state, data: action.newData, lastReloaded: new Date() };
    case actionTypes.UPDATE_CRYPTO_PAGE:
      return { ...state, pageNumber: action.pageNumber };
    default:
      return state;
  }
};