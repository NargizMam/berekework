import { createAsyncThunk } from '@reduxjs/toolkit';
import { VacancyBlockApiData } from '../../../../shared/types';
import axiosApi from '../../../../app/axiosApi';

export const getVacancyBlock = createAsyncThunk<VacancyBlockApiData>('vacancyBlock/getVacancyBlock', async () => {
  const response = await axiosApi.get<VacancyBlockApiData>('/vacanciesBlock');
  return response.data;
});

export const getVacancyCard = createAsyncThunk('vacancyBlock/getVacancyCard', async () => {
  const response = await axiosApi.get('/vacancies');
  return response.data;
});
