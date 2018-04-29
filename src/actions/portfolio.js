import actionTypes from './';

const addPortfolio = (name) => {
  return {
    type: actionTypes.ADD_PORTFOLIO,
    name
  };
};

const addToPortfolio = (index, symbol) => {
  return {
    type: actionTypes.ADD_TO_PORTFOLIO,
    index,
    symbol
  }
}

export { addPortfolio, addToPortfolio };