import { createAsyncThunk } from '@reduxjs/toolkit';
import { isAxiosError } from 'axios';
import {  Vacancy } from './types';
import axiosApi from '../../../../app/axiosApi';
import { ValidationError } from '../../../../types';

export const postVacancy = createAsyncThunk<void, Vacancy, { rejectValue: ValidationError }>(
  'reateVacancyForm/postVacancy',
  async (vacancy, { rejectWithValue }) => {
    try {
      await axiosApi.post('/vacancy', vacancy);
    } catch (e) {
      if (isAxiosError(e) && e.response && e.response.status === 422) {
        return rejectWithValue(e.response.data);
      }
      throw e;
    }
  },
);
