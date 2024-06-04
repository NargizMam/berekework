import { createSlice } from '@reduxjs/toolkit';
import { RootState } from '../../app/store/store';

interface WarningMessageState {
  showErrorMessage: boolean;
  showSuccessMessage: boolean;
}

const initialState: WarningMessageState = {
  showErrorMessage: false,
  showSuccessMessage: false,
};
const warningMessageSlice = createSlice({
  name: 'warningMessage',
  initialState,
  reducers: {
    openErrorMessage: (state) => {
      state.showErrorMessage = !state.showErrorMessage;
    },
    openSuccessMessage: (state) => {
      state.showSuccessMessage = !state.showSuccessMessage;
    },
  },
});
export const warningMessageReducer = warningMessageSlice.reducer;

export const { openErrorMessage } = warningMessageSlice.actions;
export const { openSuccessMessage } = warningMessageSlice.actions;
export const selectShowErrorMessage = (state: RootState) => state.warningMessage.showErrorMessage;
export const selectShowSuccessMessage = (state: RootState) => state.warningMessage.showSuccessMessage;
