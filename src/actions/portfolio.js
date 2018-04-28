import actionTypes from './';

const addPortfolio = (name) => {
  return {
    type: actionTypes.ADD_PORTFOLIO,
    name
  };
};

export { addPortfolio };