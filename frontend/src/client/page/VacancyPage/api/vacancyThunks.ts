import { createAsyncThunk } from '@reduxjs/toolkit';
import axiosApi from '../../../../app/axiosApi';
import { VacancyToCards } from '../model/types';

export const vacancyFetchAll = createAsyncThunk<VacancyToCards[]>('vacancyFetchAll', async () => {
  const response = await axiosApi.get('/vacancy?vacancyPage=true');
  return response.data;
});
