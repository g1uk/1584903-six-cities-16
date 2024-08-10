import {AxiosInstance} from 'axios';
import axios from 'axios';
import {getToken} from './token.ts';

const enum Default {
  BaseUrl = 'https://16.design.htmlacademy.pro/six-cities',
  Timeout = 5000,
}

export const createAPI = (): AxiosInstance => {
  const api = axios.create({
    baseURL: Default.BaseUrl as string,
    timeout: Default.Timeout as number,
  });

  api.interceptors.request.use((config) => {
    const token = getToken();
    if (token && config.headers) {
      config.headers['X-Token'] = token;
    }
    return config;
  });
  return api;
};


