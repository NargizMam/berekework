import { createSlice } from '@reduxjs/toolkit';
import { Country } from './types';
import { getCountries, postVacancy } from './createVacancyFormThuncks';
import { RootState } from '../../../../app/store/store';
import { ValidationError } from '../../../../types';

interface CreateVacancyForm {
  countries: Country[];
  cities: string[];
  isLoading: boolean;
  error: ValidationError | null
}

const initialState: CreateVacancyForm = {
  countries: [{name: 'kg'}],
  cities: ['o'],
  isLoading: false,
  error: null
};

const createVacancyFormSlice = createSlice({
  name: 'createVacancyForm',
  initialState,
  reducers: {},
  extraReducers: (bilder) => {
    bilder
      .addCase(getCountries.fulfilled, (state, {payload: countries}) => {
        state.countries = countries;
      })

      bilder
        .addCase(postVacancy.pending, (state) => {
          state.isLoading = true;
          state.error = null;
        })
        .addCase(postVacancy.fulfilled, (state) => {
          state.isLoading = false;
        })
        .addCase(postVacancy.rejected, (state, {payload: error}) => {
          state.isLoading = false;
          state.error = error || null;
        });
  },
});

export const selectCountries = (state: RootState) => state.createVacancyForm.countries;
export const selectCities = (state: RootState) => state.createVacancyForm.cities;
export const selectIsLoading = (state: RootState) => state.createVacancyForm.isLoading;
export const selectError = (state: RootState) => state.createVacancyForm.error;

export const createVacancyFormReducer = createVacancyFormSlice.reducer;
