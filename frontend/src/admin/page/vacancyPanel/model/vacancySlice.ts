import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { getAllVacancy } from '../api/vacancyThunk';
import { RootState } from '../../../../app/store/store';

interface Vacancy {
  _id: string;
  city: string;
  company: string;
  createdAt: string;
  logo: string;
  salary: {
    min: number;
    max: number;
  };
  title: string;
  updatedAt: string;
  url: string;
}

interface VacancyState {
  vacancies: Vacancy[];
  vacanciesLoading: boolean;
}

const initialState: VacancyState = {
  vacancies: [],
  vacanciesLoading: false,
};

const vacancySlice = createSlice({
  name: 'vacancy',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getAllVacancy.pending, (state) => {
      state.vacanciesLoading = true;
    });
    builder.addCase(getAllVacancy.fulfilled, (state, { payload: vacancies }: PayloadAction<Vacancy[]>) => {
      state.vacanciesLoading = false;
      state.vacancies = vacancies;
    });
    builder.addCase(getAllVacancy.rejected, (state) => {
      state.vacanciesLoading = false;
    });
  },
});

export const vacancyReducer = vacancySlice.reducer;
export const selectVacancies = (state: RootState) => state.vacancy.vacancies;
export const selectVacanciesLoading = (state: RootState) => state.vacancy.vacanciesLoading;
