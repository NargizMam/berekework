import { createAsyncThunk } from '@reduxjs/toolkit';
import axiosApi from '../../../../app/axiosApi';
import { VacancyCardApiData } from '../../../../feachers/vacancyCard/ui/VacancyCard';

export const getAllVacancy = createAsyncThunk<VacancyCardApiData[], string | undefined>(
  'vacancy/getAll',
  async (vacancyTitle) => {
    const response = await axiosApi.get<VacancyCardApiData[]>(
      `/vacancy${vacancyTitle ? `?vacancyTitle=${vacancyTitle.toLowerCase()}` : ''}`,
    );
    return response.data;
  },
);

export const deleteVacancy = createAsyncThunk<void, string>('vacancy/delete', async (id) => {
  await axiosApi.delete(`/vacancies/${id}`);
});
