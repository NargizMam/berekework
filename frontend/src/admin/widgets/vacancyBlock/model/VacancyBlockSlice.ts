import { createSlice } from '@reduxjs/toolkit';
import { getVacancyCard } from './VacancyBlockThunks';
import { VacancyBlockApiData, VacancyCardApiData } from '../types';
import { RootState } from '../../../../app/store/store';

interface VacancyBlockState {
  vacancy: VacancyCardApiData[];
  isLoading: boolean;
  block: VacancyBlockApiData | null;
  isLoadingCard: boolean;
}

const initialState: VacancyBlockState = {
  vacancy: [],
  isLoading: false,
  block: null,
  isLoadingCard: false,
};

const vacancyBlockSlice = createSlice({
  name: 'vacancyBlock',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getVacancyCard.pending, (state) => {
        state.isLoadingCard = true;
        state.vacancy = [];
      })
      .addCase(getVacancyCard.fulfilled, (state, { payload: vacancies }) => {
        state.isLoadingCard = false;
        state.vacancy = vacancies;
      })
      .addCase(getVacancyCard.rejected, (state) => {
        state.isLoadingCard = false;
      });
  },
});

export const selectVacancy = (state: RootState) => state.vacancyBlock.vacancy;
export const selectIsLoading = (state: RootState) => state.vacancyBlock.isLoading;
export const selectBlock = (state: RootState) => state.vacancyBlock.block;
export const selectisLoadingCard = (state: RootState) => state.vacancyBlock.block;

export const vacancyBlockReducer = vacancyBlockSlice.reducer;
