import { createAsyncThunk } from '@reduxjs/toolkit';
import axiosApi from '../../../axiosApi.ts';
import { Header } from '../../../types';

export const fetchHeader = createAsyncThunk<Header>('Header/fetchHeader', async () => {
  const response = await axiosApi.get<Header>('/header');
  return response.data;
});
