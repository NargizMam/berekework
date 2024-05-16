import axios from 'axios';
import { API_URL } from './constants/links';
import { Store } from '@reduxjs/toolkit';
import { RootState } from './store/store';

const axiosApi = axios.create({
  baseURL: API_URL,
});

export const addInterceptors = (store: Store<RootState>) => {
  axiosApi.interceptors.request.use((config) => {
    const token = store.getState().auth.user?.token;
    config.headers.set('Authorization', token ? 'Bearer ' + token : undefined);

    return config;
  });
};


export default axiosApi;