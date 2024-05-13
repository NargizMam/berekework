import { createSlice } from '@reduxjs/toolkit';
import { postVacancy } from './createVacancyFormThuncks';
import { RootState } from '../../../../app/store/store';
import { ValidationError } from '../../../../types';

interface CreateVacancyForm {
  isLoading: boolean;
  error: ValidationError | null;
}

const initialState: CreateVacancyForm = {
  isLoading: false,
  error: null,
};

const createVacancyFormSlice = createSlice({
  name: 'createVacancyForm',
  initialState,
  reducers: {},
  extraReducers: (bilder) => {
    bilder
      .addCase(postVacancy.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(postVacancy.fulfilled, (state) => {
        state.isLoading = false;
      })
      .addCase(postVacancy.rejected, (state, { payload: error }) => {
        state.isLoading = false;
        state.error = error || null;
      });
  },
});

export const selectIsLoading = (state: RootState) => state.createVacancyForm.isLoading;
export const selectError = (state: RootState) => state.createVacancyForm.error;

export const createVacancyFormReducer = createVacancyFormSlice.reducer;
