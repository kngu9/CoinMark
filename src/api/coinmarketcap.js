import moment from 'moment';

const API_URI = 'https://api.coinmarketcap.com/v1/';
const GRAPH_URI = 'https://graphs2.coinmarketcap.com/currencies/';

const getTicker = async () => {
  const body = await fetch(`${API_URI}ticker/?limit=0`);

  return await body.json();
}

const getHistorical = async (coin, length) => {
  // If length is invalid, get default length
  if (length <= 0) {
    const body = await fetch(`${GRAPH_URI}${coin}/`);
    return await body.json();
  } else {
    // Convert length to unix timestamp
    const end = moment().unix() * 1000;
    const start = end - (((24 * 60 * 60) * length) * 1000);
    
    const body = await fetch(`${GRAPH_URI}${coin}/${start}/${end}`);
    return await body.json();
  }
}

export { getTicker, getHistorical };
