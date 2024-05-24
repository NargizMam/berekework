import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../../../../app/store/store';
import { ModeratorApi } from '../../../../types';
import { createModerator, deleteModerator, getAllModerators } from '../api/moderatorsThunk';
import { GlobalError, ValidationError } from '../../../../client/page/Auth/model/types';


interface ModeratorState {
  moderators: ModeratorApi[];
  moderatorsLoading: boolean;
  createLoading: boolean;
  deleteLoading: boolean;
  createErrorMessage: ValidationError | null;
  errorMessage: GlobalError | null;
  successMessage: string | null;
}

const initialState: ModeratorState = {
  moderators: [],
  moderatorsLoading: false,
  createLoading: false,
  deleteLoading: false,
  createErrorMessage: null,
  errorMessage: null,
  successMessage: null,
};

const moderatorsSlice = createSlice({
  name: 'moderator',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getAllModerators.pending, (state) => {
      state.moderatorsLoading = true;
    });
    builder.addCase(getAllModerators.fulfilled, (state, { payload: moderators }: PayloadAction<ModeratorApi[]>) => {
      state.moderatorsLoading = false;
      state.moderators = moderators;
    });
    builder.addCase(getAllModerators.rejected, (state) => {
      state.moderatorsLoading = false;
    });
    builder.addCase(createModerator.pending, (state) => {
      state.createLoading = true;
      state.successMessage = null;
      state.errorMessage = null;
    });
    builder.addCase(createModerator.fulfilled, (state, { payload: message }) => {
      state.createLoading = false;
      state.successMessage = message;
      state.errorMessage = null;
    });
    builder.addCase(createModerator.rejected, (state, {payload: error}) => {
      state.createLoading = false;
      state.successMessage = null;
      state.createErrorMessage = error || null;
    });
    builder.addCase(deleteModerator.pending, (state) => {
      state.deleteLoading = true;
      state.successMessage = null;
      state.errorMessage = null;
    });
    builder.addCase(deleteModerator.fulfilled, (state, { payload: message }) => {
      state.deleteLoading = false;
      state.successMessage = message;
      state.errorMessage = null;
    });
    builder.addCase(deleteModerator.rejected, (state, {payload: error}) => {
      state.deleteLoading = false;
      state.successMessage = null;
      state.errorMessage = error || null;
    });
  },
});

export const moderatorsReducer = moderatorsSlice.reducer;
export const selectModerators = (state: RootState) => state.moderator.moderators;
export const selectModeratorsLoading = (state: RootState) => state.moderator.moderatorsLoading;
export const selectModeratorsCreating= (state: RootState) => state.moderator.createLoading;
export const selectModeratorsCreateError = (state: RootState) => state.moderator.errorMessage;
export const selectModeratorsSuccessMessage = (state: RootState) => state.moderator.successMessage;
