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
    case actionTypes.ADD_TO_PORTFOLIO:
      if (state.portfolios[action.index].coins.indexOf(action.symbol) === -1)
        state.portfolios[action.index].coins.push(action.symbol)

      return { ...state, portfolios: state.portfolios };
    default:
      return state;
  }
};