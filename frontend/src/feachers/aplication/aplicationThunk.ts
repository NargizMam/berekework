import { createAsyncThunk } from '@reduxjs/toolkit';
import axiosApi from '../../app/axiosApi';

//Создание новой заявки на вакансию
export const sendReplyByUser = createAsyncThunk<void, string>('application/createByUser', async (vacancyId) => {
  await axiosApi.post(`/applications/${vacancyId}`);
});

// Получение всех заявок
export const getReplyByUser = createAsyncThunk('application/getAll', async () => {
  const response = await axiosApi.get('/applications/');
  return response.data;
});

//Получение всех заявок для конкретной вакансии
export const getCandidateByEmployer = createAsyncThunk<[], string>('application/getSingleVacation', async (id) => {
  const response = await axiosApi.get(`/applications/${id}`);
  return response.data;
});
