import axios from 'axios';
import { apiUrl } from './constants.ts';

const axiosApi = axios.create({
  baseURL: apiUrl,
});


export default axiosApi;
