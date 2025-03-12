import axios from 'axios';
import { localStoragekeys } from '../config/localStorageKeys';

export const httpClientArts = axios.create({
  baseURL: import.meta.env.VITE_API_ARTS_URL,
});

httpClientArts.interceptors.request.use(config => {
  const token = localStorage.getItem(localStoragekeys.TOKENARTS);

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
})
