import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { getAllHeading, getSingleHeading } from '../api/HeadingThunk';
import { RootState } from '../../../app/store/store';

export interface Heading{
  _id: string;
  title: string;
  description: string;
  location: string;
  image: string | null;
  button: {
    url: string;
    text: string;
  }
}

interface HeadingState {
  headings: Heading[];
  heading: Heading | null;
  headingLoading: boolean;
}

const initialState: HeadingState = {
  headings: [],
  heading: null,
  headingLoading: false,
};

export const headingSlice = createSlice({
  name: 'heading',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder.addCase(getAllHeading.pending, (state) => {
      state.headingLoading = true;
    });
    builder.addCase(getAllHeading.fulfilled, (state, {payload: headings}: PayloadAction<Heading[]>) => {
      state.headingLoading = false;
      state.headings = headings;
    });
    builder.addCase(getAllHeading.rejected, (state) => {
      state.headingLoading = false;
    });
    builder.addCase(getSingleHeading.pending, (state) => {
      state.headingLoading = true;
    });
    builder.addCase(getSingleHeading.fulfilled, (state, {payload: heading}: PayloadAction<Heading>) => {
      state.headingLoading = false;
      state.heading = heading;
    });
    builder.addCase(getSingleHeading.rejected, (state) => {
      state.headingLoading = false;
    });
  },
});

export const headingReducer = headingSlice.reducer;
export const selectAllHeading = (state: RootState) => state.heading.headings;
export const selectSingleHeading = (state: RootState) => state.heading.heading;