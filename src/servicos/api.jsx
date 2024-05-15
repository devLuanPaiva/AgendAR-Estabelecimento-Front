import axios from 'axios';

const api = axios.create({
  baseURL: 'http://127.0.0.1:8000/',
  headers: {
    Authorization: `Bearer ${sessionStorage.getItem('access_token')}`,
    'Content-Type': 'application/json',
  },
});

export default api;