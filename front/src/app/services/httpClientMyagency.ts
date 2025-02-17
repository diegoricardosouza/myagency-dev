import axios from 'axios';
import { localStoragekeys } from '../config/localStorageKeys';

export const httpClientMyagency = axios.create({
  baseURL: import.meta.env.VITE_API_MYAGENCY_URL,
});

httpClientMyagency.interceptors.request.use(config => {
  const token = localStorage.getItem(localStoragekeys.TOKENMYAGENCY);

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
})
