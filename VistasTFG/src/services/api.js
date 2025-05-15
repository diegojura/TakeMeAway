import axios from 'axios';

const api = axios.create({
  baseURL: 'http://127.0.0.1:8000/api', // apunta directo a tu Laravel
  withCredentials: true,
});

api.interceptors.request.use(cfg => {
  const token = localStorage.getItem('token');
  if (token) {
    cfg.headers.Authorization = `Bearer ${token}`;
  }
  return cfg;
});

export default api;
