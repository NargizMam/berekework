import { createSlice } from '@reduxjs/toolkit';
import { createPage } from '../api/adminCreatePageThunks';
import { RootState } from '../../../../app/store/store';

interface AdminCreatePageState {
  creating: boolean;
}

const initialState: AdminCreatePageState = {
  creating: false,
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
  },
});

export const pageReducer = pageSlice.reducer;
export const selectPageCreating = (state: RootState) => state.page.creating;