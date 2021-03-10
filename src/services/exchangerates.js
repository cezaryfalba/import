import axios from 'axios';

export const exchangerates = async base =>
    (await axios.get(
        `https://api.exchangeratesapi.io/latest${base ? `?base=${base}` : ''}`
    )).data.rates;
