import axios from 'axios';
import { getToken } from '../Localstorage';
import { GetAccessToken } from './AuthAPI';

function Interceptors(instance) {
  // 보내기전에 하는일
  instance.interceptors.request.use(
    config => {
      const { accessToken } = getToken();
      // 헤더가 있고, accessToken이 있으면 헤더에
      if (config.headers && accessToken) config.headers.accesstoken = `Bearer ${accessToken}`;
      return config;
    },
    error => Promise.reject(error)
  );

  instance.interceptors.response.use(
    response => response,
    async error => {
      const originalRequest = error.config;
      if (error.response.data.status === 401) {
        const accessToken = await GetAccessToken();
        axios.defaults.headers.accesstoken = `Bearer ${accessToken}`;
        return instance(originalRequest);
      }
      return Promise.reject(error);
    }
  );
  return instance;
}

const authCreateInstance = () => {
  const instance = axios.create({
    baseURL: process.env.REACT_APP_SERVER_URL,
    timeout: 2000,
    headers: { 'Content-Type': 'application/json' },
  });
  return Interceptors(instance, true);
};

const authRequest = authCreateInstance();
export default authRequest;
