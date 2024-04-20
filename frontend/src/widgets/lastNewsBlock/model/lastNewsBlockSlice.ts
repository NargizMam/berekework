import { LastNewsBlockApiData } from './types';
import { createSlice } from '@reduxjs/toolkit';
import { getLastNewsBlock } from './lastNewsBlockThunks';
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
      .addCase(getLastNewsBlock.pending, (state) => {
        state.isLoading = true;
        state.block = null;
      })
      .addCase(getLastNewsBlock.fulfilled, (state, { payload: lastNewsBlock }) => {
        state.isLoading = false;
        state.block = lastNewsBlock;
      })
      .addCase(getLastNewsBlock.rejected, (state) => {
        state.isLoading = false;
      });
  },
});

export const lastNewsBlockReducer = lastNewsBlockSlice.reducer;
export const selectLastNewsBlock = (state: RootState) => state.lastNewsBlock;
export const selectIsLoading = (state: RootState) => state.lastNewsBlock.isLoading;
