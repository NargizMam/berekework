import { createAsyncThunk } from '@reduxjs/toolkit';
import axiosApi from '../../../../app/axiosApi';

export const getAllVacancy = createAsyncThunk(
  'vacancy/getAll',
  async () => {
    const response = await axiosApi.get('/vacancies');
    return response.data;
  }
);