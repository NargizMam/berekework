import { VacancyCardApiData } from '../../app/types';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { getAllVacancy, getVacancyById } from './vacancyThunk';
import { RootState } from '../../app/store/store';

interface VacancyState {
  vacancies: VacancyCardApiData[];
  vacancy: VacancyCardApiData | null;
  vacanciesLoading: boolean;
  vacancyLoading: boolean;
}

const initialState: VacancyState = {
  vacancies: [],
  vacancy: null,
  vacanciesLoading: false,
  vacancyLoading: false,
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
  },
});

export const vacancyReducer = vacancySlice.reducer;
export const selectVacancies = (state: RootState) => state.vacancy.vacancies;
export const selectVacancy = (state: RootState) => state.vacancy.vacancy;
export const selectVacanciesLoading = (state: RootState) => state.vacancy.vacanciesLoading;
export const selectVacancyLoading = (state: RootState) => state.vacancy.vacancyLoading;
