import axios from 'axios';

const api = axios.create({
  baseURL: process.env.REACT_APP_PET_API_BASE_URL,
  timeout: 5000,
  headers: {
    'Content-Type': 'application/json',
  },
});

export default api;
