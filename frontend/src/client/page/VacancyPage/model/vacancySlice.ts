import { createSlice } from '@reduxjs/toolkit';
import { RootState } from '../../../../app/store/store';
import { VacancyToCards } from './types';
import { vacancyFetchAll } from '../api/vacancyThunks';

interface VacancyState {
  vacancies: VacancyToCards[];
  vacancyFetching: boolean;
}

const initialState: VacancyState = {
  vacancies: [],
  vacancyFetching: false,
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
  },
});

export const vacancyClientReducer = vacancyClientSlice.reducer;
export const selectClientVacancies = (state: RootState) => state.vacancyClient.vacancies;
export const selectClientVacancyFetching = (state: RootState) => state.vacancyClient.vacancyFetching;
