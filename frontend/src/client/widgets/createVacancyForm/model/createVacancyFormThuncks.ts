import { createAsyncThunk } from '@reduxjs/toolkit';
import { isAxiosError } from 'axios';
import { VacancyEdtiData, VacancyMutation } from './types';
import axiosApi from '../../../../app/axiosApi';
import { ValidationError } from '../../../../types';

export const postVacancy = createAsyncThunk<void, VacancyMutation, { rejectValue: ValidationError }>(
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

export const updateVacancy = createAsyncThunk<void, VacancyEdtiData, { rejectValue: ValidationError }>(
  'reateVacancyForm/updateVacancy',
  async (vacancyEdtiData, { rejectWithValue }) => {
    try {
      await axiosApi.put(`/vacancy/${vacancyEdtiData.id}`, vacancyEdtiData.vacancy);
    } catch (e) {
      if (isAxiosError(e) && e.response && e.response.status === 422) {
        return rejectWithValue(e.response.data);
      }

      if (isAxiosError(e) && e.response && e.response.status === 404) {
        return rejectWithValue(e.response.data);
      }
      throw e;
    }
  },
);
