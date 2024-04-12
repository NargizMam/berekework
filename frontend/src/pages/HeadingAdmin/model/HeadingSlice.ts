import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { createHeadingDraft, getAllHeading, getSingleHeading } from '../api/HeadingThunk';
import { RootState } from '../../../app/store/store';
import { Heading } from './types';

export interface HeadingFields {
  title: {
    value: string;
  };
  image: {
    value: string;
  }
}

interface HeadingState {
  headings: Heading[];
  heading: Heading | null;
  headingFields: HeadingFields | null;
  headingLoading: boolean;
}

const initialState: HeadingState = {
  headings: [],
  heading: null,
  headingFields: null,
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
    builder.addCase(createHeadingDraft.pending, (state) => {
      state.headingLoading = true;
    });
    builder.addCase(createHeadingDraft.fulfilled, (state, {payload: fields}) => {
      state.headingLoading = false;
      state.headingFields = fields;
    });
    builder.addCase(createHeadingDraft.rejected, (state) => {
      state.headingLoading = false;
    });
  },
});

export const headingReducer = headingSlice.reducer;
export const selectAllHeading = (state: RootState) => state.heading.headings;
export const selectHeadingFields = (state: RootState) => state.heading.headingFields;
export const selectSingleHeading = (state: RootState) => state.heading.heading;