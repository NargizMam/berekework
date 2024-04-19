import { createSlice } from '@reduxjs/toolkit';
import { RootState } from '../../../app/store/store';
import { VacancyBlockApiData, VacancyCardApiData } from '../../../shared/api/vacancy/types';
import { getVacancyBlock, getVacancyCard } from './VacancyBlockThunks';

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
  extraReducers: (bilder) => {
    bilder
      .addCase(getVacancyBlock.pending, (state) => {
        state.isLoading = true;
        state.block = null;
      })
      .addCase(getVacancyBlock.fulfilled, (state, { payload: vacancyBlock }) => {
        state.isLoading = false;
        state.block = vacancyBlock;
      })
      .addCase(getVacancyBlock.rejected, (state) => {
        state.isLoading = false;
      });

    bilder
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
