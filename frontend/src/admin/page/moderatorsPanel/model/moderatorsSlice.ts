import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../../../../app/store/store';
import { Moderator } from '../../../../types';
import { getAllModerators } from '../api/moderatorsThunk';


interface VacancyState {
  moderators: Moderator[];
  moderatorsLoading: boolean;
}

const initialState: VacancyState = {
  moderators: [],
  moderatorsLoading: false,
};

const moderatorsSlice = createSlice({
  name: 'moderator',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getAllModerators.pending, (state) => {
      state.moderatorsLoading = true;
    });
    builder.addCase(getAllModerators.fulfilled, (state, { payload: moderators }: PayloadAction<Moderator[]>) => {
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
