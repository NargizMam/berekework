import { createAsyncThunk } from '@reduxjs/toolkit';
import { VacancyCardApiData } from '../../app/types';
import axiosApi from '../../app/axiosApi';

export const getAllVacancy = createAsyncThunk<VacancyCardApiData[], string | undefined>(
  'vacancy/getAll',
  async (vacancyTitle) => {
    const response = await axiosApi.get<VacancyCardApiData[]>(
      `/vacancy${vacancyTitle ? `?vacancyTitle=${vacancyTitle.toLowerCase()}` : ''}`,
    );
    return response.data;
  },
);

export const getVacancyById = createAsyncThunk<VacancyCardApiData, string>('vacancy/getById', async (id) => {
  const response = await axiosApi.get(`/vacancy/${id}`);
  return response.data;
});

export const deleteVacancy = createAsyncThunk<void, string>('vacancy/delete', async (id) => {
  await axiosApi.delete(`/vacancies/${id}`);
});
