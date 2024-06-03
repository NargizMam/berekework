import { createAsyncThunk } from '@reduxjs/toolkit';
import axiosApi from '../../../../app/axiosApi';
import { Vacancy } from '../../../../client/widgets/createVacancyForm/model/types';

export const getAllVacancy = createAsyncThunk('vacancy/getAll', async () => {
  const response = await axiosApi.get('/vacancy');
  return response.data;
});

export const deleteVacancy = createAsyncThunk<void, string>('vacancy/delete', async (id) => {
  await axiosApi.delete(`/vacancy/${id}`);
});

export const getVacancyById = createAsyncThunk<Vacancy, string>('vacancy/getById', async (id) => {
  const response = await axiosApi.get(`/vacancy/${id}`);
  return response.data;
});