import { createAsyncThunk } from '@reduxjs/toolkit';
import { MainCard } from './types';
import axiosApi from '../../../axiosApi';

export const fetchMainCards = createAsyncThunk<MainCard[]>('mainCards/fetchAll', async () => {
  const result = await axiosApi.get<MainCard[]>('/mainContainerCard');
  return result.data;
});

export const fetchSingleMainCard = createAsyncThunk<MainCard, string>('mainCard/fetchSingle', async (location) => {
  const result = await axiosApi.get<MainCard>(`/${location}`);
  return result.data;
});

