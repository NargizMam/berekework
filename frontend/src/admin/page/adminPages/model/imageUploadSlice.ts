import { createSlice } from '@reduxjs/toolkit';
import { fileUpload } from '../api/imageUploadThunks';
import { RootState } from '../../../../app/store/store';

interface ImageUploadState {
  imageLocation: string;
  imageUpload: boolean;
}

const initialState: ImageUploadState = {
  imageLocation: '',
  imageUpload: false,
};

const fileSlice = createSlice({
  name: 'file',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fileUpload.pending, (state) => {
        state.imageUpload = true;
      })
      .addCase(fileUpload.fulfilled, (state, { payload }) => {
        state.imageLocation = payload;
        state.imageUpload = false;
      })
      .addCase(fileUpload.rejected, (state) => {
        state.imageUpload = false;
      });
  },
});

export const fileReducer = fileSlice.reducer;
export const selectImageLocation = (state: RootState) => state.file.imageLocation;
export const selectImageUpload = (state: RootState) => state.file.imageUpload;