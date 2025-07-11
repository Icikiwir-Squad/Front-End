import axios from 'axios';
import { getToken, isTokenExpired, removeToken } from '../../auth/lib/token';

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BASE_API,
});

api.interceptors.request.use((config) => {
  const token = getToken();
  if (token) {
    if (isTokenExpired(token)) {
      removeToken();
      console.warn('Sesi Login Anda habis silahkan Login kembali!');
    } else {
      config.headers.Authorization = `Bearer ${token}`;
    }
  }
  return config;
});

export default api;
