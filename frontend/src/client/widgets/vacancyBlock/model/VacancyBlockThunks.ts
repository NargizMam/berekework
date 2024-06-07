import { createAsyncThunk } from '@reduxjs/toolkit';
import axiosApi from '../../../../app/axiosApi';

export const getVacancyCard = createAsyncThunk('vacancyBlock/getVacancyCard', async () => {
  const response = await axiosApi.get('/vacancy');
  return response.data;
});
