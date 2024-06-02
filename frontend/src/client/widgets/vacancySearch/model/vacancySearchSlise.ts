import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../../../../app/store/store';
import { searchVacancy } from './vacancySearchThunks';
import { Vacancy } from '../../createVacancyForm/model/types';

interface VacancyState {
  vacancies: Vacancy[];
  vacanciesLoading: boolean;
  searchVacanciesLoading: boolean;
}

const initialState: VacancyState = {
  vacancies: [],
  vacanciesLoading: false,
  searchVacanciesLoading: false,
};

const vacancySlice = createSlice({
  name: 'vacancy',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(searchVacancy.pending, (state) => {
      state.searchVacanciesLoading = true;
    });
    builder.addCase(searchVacancy.fulfilled, (state, { payload: vacancies }: PayloadAction<Vacancy[]>) => {
      state.searchVacanciesLoading = false;
      state.vacancies = vacancies;
    });
    builder.addCase(searchVacancy.rejected, (state) => {
      state.searchVacanciesLoading = false;
    });
  },
});

export const vacancyReducer = vacancySlice.reducer;
export const selectSearchVacancies = (state: RootState) => state.vacancy.vacancies;
export const searchVacanciesLoading = (state: RootState) => state.vacancy.vacanciesLoading;
