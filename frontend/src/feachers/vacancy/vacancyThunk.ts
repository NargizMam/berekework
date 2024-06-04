import { createAsyncThunk } from '@reduxjs/toolkit';
import { VacancyCardApiData } from '../../app/types';
import axiosApi from '../../app/axiosApi';
import { CategoryVacancyI, VacancyCategoryGet } from '../../client/page/VacancyPage/model/types';
import { titleVacancyFilter, vacancyCategory } from '../../app/constants/links';

export const getAllVacancy = createAsyncThunk<VacancyCardApiData[], string | undefined>(
  'vacancy/getAll',
  async (vacancyTitle) => {
    const response = await axiosApi.get<VacancyCardApiData[]>(
      `/vacancy${vacancyTitle ? `?vacancyTitle=${vacancyTitle.toLowerCase()}` : ''}`,
    );
    return response.data;
  },
);

export const vacancyFetchCategory = createAsyncThunk<CategoryVacancyI[]>(
  'vacancyFetchCategories/getCategories',
  async () => {
    const response = await axiosApi.get('/vacancy?getCategory=true');
    const test: VacancyCategoryGet = response.data;
    const mainCategory: CategoryVacancyI[] = [];

    Object.entries(test).forEach(([key, value]) => {
      Object.entries(titleVacancyFilter).forEach(([titleKey, titleValue]) => {
        if (key === titleKey) {
          mainCategory.push({
            id: Math.random().toString(),
            title: titleValue,
            name: titleKey,
            values: value.map((item) => ({
              id: Math.random().toString(),
              value: item,
              valueSend: item,
            })),
          });
        }
      });
    });

    return [...vacancyCategory, ...mainCategory];
  },
);

export const vacancyGetByCategory = createAsyncThunk<VacancyCardApiData[], { [key: string]: string }>(
  'vacancyGetByCategory/getByCategory',
  async (values) => {
    const params = new URLSearchParams({ category: 'true', ...values });
    const response = await axiosApi.get(`/vacancy?${params.toString()}`);
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
