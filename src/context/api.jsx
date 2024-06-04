import axios from 'axios';

const api = axios.create({
  baseURL: 'http://3.233.229.141:8000/',
  headers: {
    'Content-Type': 'application/json',
  },
});

export default api;
