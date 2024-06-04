import { createSlice } from '@reduxjs/toolkit';
import { Block } from '../blockTypes';
import { fetchBlock, fetchBlocks, getLastNewsBlock } from './blockThunk';
import { RootState } from '../../../../../app/store/store';

interface BlockState {
  blocks: Block[];
  block: Block | null;
  fetchAllLoading: boolean;
  fetchOneLoading: boolean;
  fetchCreating: boolean;
  fetchDeleting: boolean;
}

const initialState: BlockState = {
  blocks: [],
  block: null,
  fetchAllLoading: false,
  fetchOneLoading: false,
  fetchCreating: false,
  fetchDeleting: false,
};

export const blockSlice = createSlice({
  name: 'blocks',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchBlocks.pending, (state) => {
      state.fetchAllLoading = true;
    });
    builder.addCase(fetchBlocks.fulfilled, (state, { payload: blocks }) => {
      state.fetchAllLoading = false;
      state.blocks = blocks;
    });
    builder.addCase(fetchBlocks.rejected, (state) => {
      state.fetchAllLoading = false;
    });
    builder.addCase(fetchBlock.pending, (state) => {
      state.fetchOneLoading = true;
    });
    builder.addCase(fetchBlock.fulfilled, (state, { payload: block }) => {
      state.fetchOneLoading = false;
      state.block = block;
    });
    builder.addCase(fetchBlock.rejected, (state) => {
      state.fetchOneLoading = false;
    });
    builder
      .addCase(getLastNewsBlock.pending, (state) => {
        state.fetchAllLoading = true;
        state.block = null;
      })
      .addCase(getLastNewsBlock.fulfilled, (state, { payload: lastNewsBlock }) => {
        state.fetchAllLoading = false;
        state.block = Array.isArray(lastNewsBlock) ? lastNewsBlock[0] : lastNewsBlock;
      })
      .addCase(getLastNewsBlock.rejected, (state) => {
        state.fetchAllLoading = false;
      });
  },
});

export const lastNewsReducer = blockSlice.reducer;
export const selectBlocks = (state: RootState) => state.lastNews.blocks;
export const selectBlock = (state: RootState) => state.lastNews.block;
export const selectBlocksLoading = (state: RootState) => state.lastNews.fetchAllLoading;
export const selectOneBlockLoading = (state: RootState) => state.lastNews.fetchOneLoading;
