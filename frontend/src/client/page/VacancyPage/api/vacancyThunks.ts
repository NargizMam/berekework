import { createAsyncThunk } from '@reduxjs/toolkit';
import axiosApi from '../../../../app/axiosApi';
import { CategoryVacancyI, VacancyCategoryGet, VacancyToCards } from '../model/types';
import { titleVacancyFilter, vacancyCategory } from '../../../../app/constants/links';

export const vacancyFetchAll = createAsyncThunk<VacancyToCards[]>('vacancyFetchAll', async () => {
  const response = await axiosApi.get('/vacancy?vacancyPage=true');
  return response.data;
});

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
