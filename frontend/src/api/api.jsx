import axios from 'axios';

const api = axios.create({
  baseURL: 'https://company-ticket-raising-1.onrender.com/api',
    withCredentials: true
});

export default api;
