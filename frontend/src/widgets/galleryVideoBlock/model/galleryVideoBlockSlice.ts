import { createSlice } from '@reduxjs/toolkit';
import { RootState } from '../../../app/store/store';
import { GalleryVideoBlockApiData } from './types';
import { getGalleryVideoBlock } from './galleryVideoBlockThunks';

interface LastNewsBlockState {
  block: GalleryVideoBlockApiData | null;
  isLoading: boolean;
}

const initialState: LastNewsBlockState = {
  block: null,
  isLoading: false,
};

const galleryVideoBlockSlice = createSlice({
  name: 'galleryVideoBlock',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getGalleryVideoBlock.pending, (state) => {
        state.isLoading = true;
        state.block = null;
      })
      .addCase(getGalleryVideoBlock.fulfilled, (state, { payload: galleryVideoBlock }) => {
        state.isLoading = false;
        state.block = galleryVideoBlock;
      })
      .addCase(getGalleryVideoBlock.rejected, (state) => {
        state.isLoading = false;
      });
  },
});

export const galleryVideoBlockReducer = galleryVideoBlockSlice.reducer;
export const selectGalleryVideoBlock = (state: RootState) => state.galleryVideoBlock.block;
export const selectGalleryVideoBlockLoading = (state: RootState) => state.galleryVideoBlock.isLoading;
