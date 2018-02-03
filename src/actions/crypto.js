import actionTypes from './';

const updateCrypto = (newData) => {
  return {
    type: actionTypes.UPDATE_CRYPTO_DATA,
    newData
  }
};

const setLoading = (loading) => {
  return {
    type: actionTypes.SET_CRYPTO_LOADING,
    loading
  }
}

export { updateCrypto };