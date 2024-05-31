import { createSlice } from '@reduxjs/toolkit';
import { RootState } from '../../../../app/store/store';
import { CategoryVacancyI, VacancyToCards } from './types';
import { vacancyFetchAll, vacancyFetchCategory } from '../api/vacancyThunks';

interface VacancyState {
  vacancies: VacancyToCards[];
  vacancyCategory: CategoryVacancyI[];
  vacancyFetching: boolean;
  vacancyCategoryFetching: boolean;
}

const initialState: VacancyState = {
  vacancies: [],
  vacancyCategory: [],
  vacancyFetching: false,
  vacancyCategoryFetching: false,
};

const vacancyClientSlice = createSlice({
  name: 'vacancyClient',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(vacancyFetchAll.pending, (state) => {
        state.vacancyFetching = true;
      })
      .addCase(vacancyFetchAll.fulfilled, (state, { payload }) => {
        state.vacancies = payload;
        state.vacancyFetching = false;
      })
      .addCase(vacancyFetchAll.rejected, (state) => {
        state.vacancyFetching = false;
      });
    builder
      .addCase(vacancyFetchCategory.pending, (state) => {
        state.vacancyCategoryFetching = true;
      })
      .addCase(vacancyFetchCategory.fulfilled, (state, { payload }) => {
        state.vacancyCategoryFetching = false;
        state.vacancyCategory = payload;
      })
      .addCase(vacancyFetchCategory.rejected, (state) => {
        state.vacancyCategoryFetching = false;
      });
  },
});

export const vacancyClientReducer = vacancyClientSlice.reducer;
export const selectClientVacancies = (state: RootState) => state.vacancyClient.vacancies;
export const selectClientVacancyFetching = (state: RootState) => state.vacancyClient.vacancyFetching;
export const selectClientVacancyCategory = (state: RootState) => state.vacancyClient.vacancyCategory;
export const selectClientVacancyCategoryFetching = (state: RootState) => state.vacancyClient.vacancyCategoryFetching;
