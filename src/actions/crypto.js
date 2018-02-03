import actionTypes from './';

const updateCrypto = (newData) => {
  return {
    type: actionTypes.UPDATE_CRYPTO_DATA,
    newData
  }
};

const updatePage = (pageNumber) => {
  return {
    type: actionTypes.UPDATE_CRYPTO_PAGE,
    pageNumber
  }
}

export { updateCrypto, updatePage };