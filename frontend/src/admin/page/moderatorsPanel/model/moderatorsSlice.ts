import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../../../../app/store/store';
import { ModeratorApi } from '../../../../types';
import { getAllModerators } from '../api/moderatorsThunk';
import { GlobalError } from '../../../../client/page/Auth/model/types';


interface VacancyState {
  moderators: ModeratorApi[];
  moderatorsLoading: boolean;
  createLoading: boolean;
  createError: GlobalError | null;
}

const initialState: VacancyState = {
  moderators: [],
  moderatorsLoading: false,
  createLoading: false,
  createError: null,
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
  },
});

export const moderatorsReducer = moderatorsSlice.reducer;
export const selectModerators = (state: RootState) => state.moderator.moderators;
export const selectModeratorsLoading = (state: RootState) => state.moderator.moderatorsLoading;
export const selectModeratorsCreating= (state: RootState) => state.moderator.createLoading;
export const selectModeratorsCreateError = (state: RootState) => state.moderator.createError;
