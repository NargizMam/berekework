import { createAsyncThunk } from '@reduxjs/toolkit';
import axiosApi from '../../../axiosApi';
import { LastNewsBlockApiData } from './types';

export const getLastNewsBlock = createAsyncThunk<LastNewsBlockApiData>(
  'lastNewsBlock/geLastNewsBlock', async () => {
    const response = await axiosApi.get<LastNewsBlockApiData>('/last-news-block');
    return response.data;
  });

export const getLastNewsBlockById = createAsyncThunk<LastNewsBlockApiData, string>(
  'lastNewsBlock/geLastNewsBlock',
  async (id) => {
    const response = await axiosApi.get<LastNewsBlockApiData>(`/last-news-block/${id}`);
    return response.data;
  }
);

