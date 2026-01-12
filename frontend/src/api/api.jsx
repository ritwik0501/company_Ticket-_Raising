import axios from 'axios';

const api = axios.create({
  baseURL: 'https://company-ticket-raising-m4ff.vercel.app/api',
    withCredentials: true
});

export default api;
