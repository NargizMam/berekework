import { createAsyncThunk } from '@reduxjs/toolkit';
import axios, { isAxiosError } from 'axios';
import { api, apiKey, regions } from './constants';
import { ApiAnswer, Country, Vacancy } from './types';
import axiosApi from '../../../../app/axiosApi';
import { ValidationError } from '../../../../types';

export const getCountries = createAsyncThunk<Country[]>('createVacancyForm/getCountries', async () => {
  const countries: Country[] = [];
  regions.forEach(async (region) => {
    const data = await axios.get<Country[]>(`${api}/geo/api.php?location=${region}&json&api_key=${apiKey}`);
    countries.push(...data.data);
  });
  return countries;
});

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
