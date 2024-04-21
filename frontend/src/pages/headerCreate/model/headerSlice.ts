import { createSlice } from '@reduxjs/toolkit';
import { RootState } from '../../../app/store/store';
import { IHeader } from '../../../shared/api/admin/types';
import { createHeader, fetchHeader } from '../api/headerThunks';

interface HeaderState {
  headerData: IHeader | null;
  fetching: boolean;
  creating: boolean;
}

const initialState: HeaderState = {
  headerData: null,
  fetching: false,
  creating: false,
};

const headerSlice = createSlice({
  name: 'header',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(createHeader.pending, (state) => {
        state.creating = true;
      })
      .addCase(createHeader.fulfilled, (state) => {
        state.creating = false;
      })
      .addCase(createHeader.rejected, (state) => {
        state.creating = false;
      });
    builder
      .addCase(fetchHeader.pending, (state) => {
        state.fetching = true;
      })
      .addCase(fetchHeader.fulfilled, (state, { payload }) => {
        state.headerData = payload;
        state.fetching = false;
      })
      .addCase(fetchHeader.rejected, (state) => {
        state.fetching = false;
      });
  },
});

export const headerReducer = headerSlice.reducer;
export const selectHeader = (state: RootState) => state.header.headerData;
export const selectHeaderFetching = (state: RootState) => state.header.fetching;
export const selectHeaderCreating = (state: RootState) => state.header.creating;
