import axios from 'axios';
import { Store } from '@reduxjs/toolkit';
import { RootState } from './store/store';
import { apiURL } from '../constants';

const axiosApi = axios.create({
  baseURL: apiURL,
});

export const addInterceptors = (store: Store<RootState>) => {
  axiosApi.interceptors.request.use((config) => {
    const token = store.getState().auth.user?.token || store.getState().auth.employer?.token;
    config.headers.set('Authorization', token ? 'Bearer ' + token : undefined);

    return config;
  });
};

export default axiosApi;
