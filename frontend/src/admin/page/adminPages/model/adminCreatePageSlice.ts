import { createSlice } from '@reduxjs/toolkit';
import { createPage, fetchOnePage } from '../api/adminCreatePageThunks';
import { RootState } from '../../../../app/store/store';
import { OnePageResponse } from './types';

interface AdminCreatePageState {
  onePage: OnePageResponse | null;
  creating: boolean;
  fetchingOne: boolean;
}

const initialState: AdminCreatePageState = {
  onePage: null,
  creating: false,
  fetchingOne: false,
};

const pageSlice = createSlice({
  name: 'page',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(createPage.pending, (state) => {
        state.creating = true;
      })
      .addCase(createPage.fulfilled, (state) => {
        state.creating = false;
      })
      .addCase(createPage.rejected, (state) => {
        state.creating = false;
      });

    builder.addCase(fetchOnePage.pending, (state) => {
      state.fetchingOne = true;
    }).addCase(fetchOnePage.fulfilled, (state, { payload }) => {
      state.onePage = payload;
      state.fetchingOne = false;
    }).addCase(fetchOnePage.rejected, (state) => {
      state.fetchingOne = false;
    });
  },
});

export const pageReducer = pageSlice.reducer;
export const selectPageCreating = (state: RootState) => state.page.creating;
export const selectOnePage = (state: RootState) => state.page.onePage;