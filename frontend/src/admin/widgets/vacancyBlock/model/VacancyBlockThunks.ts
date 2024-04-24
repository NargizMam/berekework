import { createAsyncThunk } from '@reduxjs/toolkit';
import axiosApi from '../../../../app/axiosApi';
import { VacancyBlockApiData } from '../../../../shared/types';



export const getVacancyBlock = createAsyncThunk<VacancyBlockApiData>('vacancyBlock/getVacancyBlock', async () => {
  const response = await axiosApi.get<VacancyBlockApiData>('/vacanciesBlock');
  return response.data;
});

export const getVacancyCard = createAsyncThunk('vacancyBlock/getVacancyCard', async () => {
  const response = await axiosApi.get('/vacancies');
  return response.data;
});
