import { createSlice } from '@reduxjs/toolkit';
import { RootState } from '../../app/store/store';

interface WarningMessageState {
  showErrorMessage: boolean;
  successMessage: string | null;
  showSuccessMessage: boolean;
  errorMessage: string | null;
}

const initialState: WarningMessageState = {
  showErrorMessage: false,
  showSuccessMessage: false,
  successMessage: null,
  errorMessage: null,
};
const warningMessageSlice = createSlice({
  name: 'warningMessage',
  initialState,
  reducers: {
    openErrorMessage: (state, { payload }) => {
      state.showErrorMessage = true;
      state.errorMessage = payload;
    },
    closeErrorMessage: (state) => {
      state.showErrorMessage = false;
      state.errorMessage = null;
    },
    openSuccessMessage: (state, { payload }) => {
      state.showSuccessMessage = true;
      state.successMessage = payload;
    },
    closeSuccessMessage: (state) => {
      state.showSuccessMessage = false;
      state.successMessage = null;
    },
  },
});
export const warningMessageReducer = warningMessageSlice.reducer;

export const { openErrorMessage, openSuccessMessage, closeSuccessMessage, closeErrorMessage } =
  warningMessageSlice.actions;
export const selectShowErrorMessage = (state: RootState) => state.warningMessage.showErrorMessage;
export const selectShowSuccessMessage = (state: RootState) => state.warningMessage.showSuccessMessage;
export const selectErrorMessage = (state: RootState) => state.warningMessage.errorMessage;
export const selectSuccessMessage = (state: RootState) => state.warningMessage.successMessage;
