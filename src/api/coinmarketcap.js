import moment from 'moment';

const API_URI = 'https://api.coinmarketcap.com/v1/';
const GRAPH_URI = 'https://graphs2.coinmarketcap.com/currencies/';

const getTicker = async (page) => {
  let body = null;

  body = await fetch(`${API_URI}ticker/?start=${page * 30}&limit=30`);

  return await body.json();
}

const getHistorical = async (coin, length) => {
  if (length <= 0) {
    const body = await fetch(`${GRAPH_URI}${coin}/`);
    return await body.json();
  } else {
    const end = moment(new Date());
    const start = end.subtract(length, "days");
    
    const body = await fetch(`${GRAPH_URI}${coin}/${start.unix() * 1000}/${end.unix() * 1000}`);
    return await body.json();
  }
}

export { getTicker, getHistorical };