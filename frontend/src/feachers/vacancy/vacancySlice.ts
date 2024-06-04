import { CategoryVacancyI, VacancyCardApiData } from '../../app/types';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { getAllVacancy, getVacancyById, vacancyFetchCategory, vacancyGetByCategory } from './vacancyThunk';
import { RootState } from '../../app/store/store';

interface VacancyState {
  vacancies: VacancyCardApiData[];
  vacancy: VacancyCardApiData | null;
  vacancyCategory: CategoryVacancyI[];
  vacancyCategoryLoading: boolean;
  vacanciesLoading: boolean;
  vacancyLoading: boolean;
}

const initialState: VacancyState = {
  vacancies: [],
  vacancy: null,
  vacancyCategory: [],
  vacanciesLoading: false,
  vacancyLoading: false,
  vacancyCategoryLoading: false,
};

const vacancySlice = createSlice({
  name: 'vacancy',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getAllVacancy.pending, (state) => {
      state.vacanciesLoading = true;
    });
    builder.addCase(getAllVacancy.fulfilled, (state, { payload: vacancies }: PayloadAction<VacancyCardApiData[]>) => {
      state.vacanciesLoading = false;
      state.vacancies = vacancies;
    });
    builder.addCase(getAllVacancy.rejected, (state) => {
      state.vacanciesLoading = false;
    });
    builder.addCase(getVacancyById.pending, (state) => {
      state.vacancyLoading = true;
    });
    builder.addCase(getVacancyById.fulfilled, (state, { payload: vacancy }: PayloadAction<VacancyCardApiData>) => {
      state.vacancyLoading = false;
      state.vacancy = vacancy;
    });
    builder.addCase(getVacancyById.rejected, (state) => {
      state.vacancyLoading = false;
    });
    builder.addCase(vacancyGetByCategory.pending, (state) => {
      state.vacanciesLoading = true;
    });
    builder.addCase(vacancyGetByCategory.fulfilled, (state, { payload: vacancy }) => {
      state.vacancies = vacancy;
      state.vacanciesLoading = false;
    });
    builder.addCase(vacancyGetByCategory.rejected, (state) => {
      state.vacanciesLoading = false;
    });
    builder.addCase(vacancyFetchCategory.pending, (state) => {
      state.vacancyCategoryLoading = true;
    });
    builder.addCase(vacancyFetchCategory.fulfilled, (state, { payload }) => {
      state.vacancyCategoryLoading = false;
      state.vacancyCategory = payload;
    });
    builder.addCase(vacancyFetchCategory.rejected, (state) => {
      state.vacancyCategoryLoading = false;
    });
  },
});

export const vacancyReducer = vacancySlice.reducer;
export const selectVacancies = (state: RootState) => state.vacancy.vacancies;
export const selectVacancy = (state: RootState) => state.vacancy.vacancy;
export const selectClientVacancyCategory = (state: RootState) => state.vacancy.vacancyCategory;
export const selectClientVacancyCategoryFetching = (state: RootState) => state.vacancy.vacancyCategoryLoading;
export const selectVacanciesLoading = (state: RootState) => state.vacancy.vacanciesLoading;
export const selectVacancyLoading = (state: RootState) => state.vacancy.vacancyLoading;
