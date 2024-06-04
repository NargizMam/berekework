import { createSlice } from '@reduxjs/toolkit';
import { fetchChooseBlock } from '../api/chooseBlockThunk';
import { RootState } from '../../../../app/store/store';
import { ChooseBlock } from './types';

interface ChooseBlockState {
  items: ChooseBlock | null;
  fetchLoadingAlbums: boolean;
}

const initialState: ChooseBlockState = {
  items: null,
  fetchLoadingAlbums: false,
};

export const chooseBlockSlice = createSlice({
  name: 'albums',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchChooseBlock.pending, (state) => {
      state.fetchLoadingAlbums = true;
    });
    builder.addCase(fetchChooseBlock.fulfilled, (state, { payload: albums }) => {
      state.fetchLoadingAlbums = false;
      state.items = albums;
    });
    builder.addCase(fetchChooseBlock.rejected, (state) => {
      state.fetchLoadingAlbums = false;
    });
  },
});

export const chooseBlockReducer = chooseBlockSlice.reducer;
export const selectChooseBlock = (state: RootState) => state.chooseBlock.items;
