import axios from 'axios';

const api = axios.create({
  baseURL: 'https://backend-iota-hazel.vercel.app/api/',
  headers: {
    'Content-Type': 'application/json',
  },
});

export default api;
