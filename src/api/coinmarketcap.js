const API_URI = 'https://api.coinmarketcap.com/v1/';

const getTicker = async () => {
  const body = await fetch(`${API_URI}ticker`);
  return await body.json();
}

export { getTicker };