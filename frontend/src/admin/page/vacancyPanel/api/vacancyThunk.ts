import { createAsyncThunk } from '@reduxjs/toolkit';
import axiosApi from '../../../../app/axiosApi';

export const getAllVacancy = createAsyncThunk('vacancy/getAll', async () => {
  const response = await axiosApi.get('/vacancies');
  return response.data;
});

export const deleteVacancy = createAsyncThunk<void, string>('vacancy/delete', async (id) => {
  await axiosApi.delete(`/vacancies/${id}`);
});
