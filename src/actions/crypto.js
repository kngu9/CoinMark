import actionTypes from './';

const updateCrypto = (newData) => {
  return {
    type: actionTypes.UPDATE_CRYPTO_DATA,
    newData
  };
};

export { updateCrypto };