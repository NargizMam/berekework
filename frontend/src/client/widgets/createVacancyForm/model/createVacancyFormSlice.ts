import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { postVacancy, updateVacancy } from './createVacancyFormThuncks';
import { RootState } from '../../../../app/store/store';
import { ValidationError } from '../../../../types';
import { VacancyWithId } from './types';

interface CreateVacancyForm {
  isLoading: boolean;
  editVacancy: VacancyWithId | null;
  error: ValidationError | null;
}

const initialState: CreateVacancyForm = {
  isLoading: false,
  editVacancy: null,
  error: null,
};

const createVacancyFormSlice = createSlice({
  name: 'createVacancyForm',
  initialState,
  reducers: {
    getEditVacancy: (state, { payload: vacancy }: PayloadAction<VacancyWithId>) => {
      state.editVacancy = vacancy;
    },
    clearEditVacancy: (state) => {
      state.editVacancy = null;
    },
  },
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

    bilder
      .addCase(updateVacancy.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(updateVacancy.fulfilled, (state) => {
        state.isLoading = false;
      })
      .addCase(updateVacancy.rejected, (state, { payload: error }) => {
        state.isLoading = false;
        state.error = error || null;
      });
  },
});

export const selectIsLoading = (state: RootState) => state.createVacancyForm.isLoading;
export const selectError = (state: RootState) => state.createVacancyForm.error;
export const selectEditVacancy = (state: RootState) => state.createVacancyForm.editVacancy;

export const { getEditVacancy, clearEditVacancy } = createVacancyFormSlice.actions;

export const createVacancyFormReducer = createVacancyFormSlice.reducer;
