import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { getAllVacancy, getVacancyById } from '../api/vacancyThunk';
import { RootState } from '../../../../app/store/store';
import { Employer } from '../../employerPanel/model/types';

interface Vacancy {
  _id: string;
  logo: string;
  company: string;
  vacancyTitle: string;
  aboutVacancy: string;
  responsibilities: string;
  workConditions: string;
  country: string;
  city: string;
  fieldOfWork: string;
  createdAt: string;
  salary: {
    minSalary: number;
    maxSalary: number;
  };
  age: {
    minAge: number;
    maxAge: number;
  };
  education: string;
  employmentType: string;
  employer: Employer | undefined;
}

interface VacancyState {
  vacancies: Vacancy[];
  vacancy: Vacancy | null;
  vacanciesLoading: boolean;
}

const initialState: VacancyState = {
  vacancies: [],
  vacancy: null,
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
    
    builder.addCase(getVacancyById.pending, (state) => {
      state.vacanciesLoading = true;
    });
    builder.addCase(getVacancyById.fulfilled, (state, { payload: vacancy }: PayloadAction<Vacancy>) => {
      state.vacanciesLoading = false;
      state.vacancy = vacancy;
    });
    builder.addCase(getVacancyById.rejected, (state) => {
      state.vacanciesLoading = false;
    });
  },
});

export const vacancyReducer = vacancySlice.reducer;

export const selectVacancies = (state: RootState) => state.vacancy.vacancies;
export const selectVacancy = (state: RootState) => state.vacancy.vacancy;

export const selectVacanciesLoading = (state: RootState) => state.vacancy.vacanciesLoading;
export const selectVacancyLoading = (state: RootState) => state.vacancy.vacanciesLoading;
