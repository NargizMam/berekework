import { createAsyncThunk } from '@reduxjs/toolkit';
import axiosApi from '../../../../app/axiosApi';
import { Vacancy } from '../../createVacancyForm/model/types';

export const searchVacancy = createAsyncThunk<Vacancy[], string>('vacancy/search', async (searchQuery) => {
  const response = await axiosApi.get(`/vacancy?query=${searchQuery}`);
  return response.data;
});
