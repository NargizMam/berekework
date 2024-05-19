import { createAsyncThunk } from '@reduxjs/toolkit';
import axiosApi from '../../../../app/axiosApi';
import { VacancyBlockApiData } from '../types';


export const getVacancyBlock = createAsyncThunk<VacancyBlockApiData>('vacancyBlock/getVacancyBlock', async () => {
  const response = await axiosApi.get('/vacanciesBlock');
  const block = response.data[0];
  return block;
});

export const getVacancyCard = createAsyncThunk('vacancyBlock/getVacancyCard', async () => {
  const response = await axiosApi.get('/vacancy');
  return response.data;
});
