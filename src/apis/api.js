import axios from 'axios';

const API = axios.create({
  baseURL: 'https://google-meet-cost-server.onrender.com/api',
  headers: {
    'Content-Type': 'application/json',
  },
});

export default API;
