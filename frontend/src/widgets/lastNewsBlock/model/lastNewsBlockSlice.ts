import { LastNewsBlockApiData } from './types';
import { createSlice } from '@reduxjs/toolkit';
import { getLastNewsBlockById } from './lastNewsBlockThunks';
import { RootState } from '../../../app/store/store';

interface LastNewsBlockState {
  block: LastNewsBlockApiData | null;
  isLoading: boolean;
}

const initialState: LastNewsBlockState = {
  block: null,
  isLoading: false,
};

const lastNewsBlockSlice = createSlice({
  name: 'lastNewsBlock',
  initialState,
  reducers: {},
  extraReducers: (bilder) => {
    bilder
      .addCase(getLastNewsBlockById.pending, (state) => {
        state.isLoading = true;
        state.block = null;
      })
      .addCase(getLastNewsBlockById.fulfilled, (state, { payload: lastNewsBlock }) => {
        state.isLoading = false;
        state.block = lastNewsBlock;
      })
      .addCase(getLastNewsBlockById.rejected, (state) => {
        state.isLoading = false;
      });
  },
});

export const lastNewsBlockReducer = lastNewsBlockSlice.reducer;
export const selectLastNewsBlockbyId = (state: RootState) => state.lastNewsBlock;
export const selectIsLoading = (state: RootState) => state.lastNewsBlock.isLoading;
