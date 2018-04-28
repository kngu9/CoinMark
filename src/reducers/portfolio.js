import actionTypes from '../actions';

const initialState = {
  portfolios: []
};

export default (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.ADD_PORTFOLIO:
      state.portfolios.push({
        name: action.name,
        coins: []
      });

      return { ...state, portfolios: state.portfolios };
    default:
      return state;
  }
};