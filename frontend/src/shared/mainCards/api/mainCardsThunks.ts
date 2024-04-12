import { createAsyncThunk } from '@reduxjs/toolkit';
import axiosApi from '../../../axiosApi.ts';
import { MainCard } from '../model/types';

export const fetchMainCards = createAsyncThunk<MainCard[]>('mainCards/fetchAll', async () => {
  const result = await axiosApi.get<MainCard[]>('/mainContainerCard');
  return result.data;
});

export const fetchSingleMainCard = createAsyncThunk<MainCard, string>('mainCard/fetchSingle', async (location) => {
  const result = await axiosApi.get<MainCard>(`/${location}`);
  return result.data;
});

