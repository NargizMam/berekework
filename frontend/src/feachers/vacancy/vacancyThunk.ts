import { createAsyncThunk } from '@reduxjs/toolkit';
import { CategoryVacancyI, VacancyApiData, VacancyCategoryGet, VacancyResponseToCard } from '../../app/types';
import axiosApi from '../../app/axiosApi';
import { titleVacancyFilter, vacancyCategory } from '../../app/constants/links';

export const getAllVacancy = createAsyncThunk<VacancyApiData[]>('vacancy/getAll', async () => {
  const response = await axiosApi.get<VacancyApiData[]>('/vacancy');
  return response.data;
});

export const getAllVacancyToCard = createAsyncThunk<VacancyResponseToCard[], string | undefined>(
  'vacancy/getAllToCard',
  async (vacancyTitle) => {
    const response = await axiosApi.get<VacancyResponseToCard[]>(
      `/vacancy?vacancyCard=true${vacancyTitle ? `&vacancyTitle=${vacancyTitle.toLowerCase()}` : ''}`,
    );
    return response.data;
  },
);

export const getAllVacancyByKgOrAbroad = createAsyncThunk<VacancyResponseToCard[], string>(
  'vacancy/getAllVacancyByKgOrAbroad',
  async (filter) => {
    const response = await axiosApi.get<VacancyResponseToCard[]>(
      `/vacancy${filter === 'abroad' ? '?abroad=true' : '?kyrgyzstan=true'}`,
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

export const vacancyGetByCategory = createAsyncThunk<VacancyResponseToCard[], { [key: string]: string }>(
  'vacancyGetByCategory/getByCategory',
  async (values) => {
    const params = new URLSearchParams({ category: 'true', ...values });
    const response = await axiosApi.get(`/vacancy?${params.toString()}`);
    return response.data;
  },
);

export const getVacancyById = createAsyncThunk<VacancyApiData, string>('vacancy/getById', async (id) => {
  const response = await axiosApi.get(`/vacancy/${id}`);
  return response.data;
});

export const deleteVacancy = createAsyncThunk<void, string>('vacancy/delete', async (id) => {
  await axiosApi.delete(`/vacancy/${id}`);
});
