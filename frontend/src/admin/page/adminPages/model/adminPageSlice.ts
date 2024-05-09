import { createSlice } from '@reduxjs/toolkit';
import { createPage, deletePage, editPage, fetchAllPages, fetchOnePage } from '../api/adminPageThunks';
import { RootState } from '../../../../app/store/store';
import { AllPagesCRM, OnePageResponse } from './types';

interface AdminCreatePageState {
  pages: AllPagesCRM[];
  onePage: OnePageResponse | null;
  creating: boolean;
  fetching: boolean;
  fetchingOne: boolean;
  editPageLoading: boolean;
  pageDeleteLoading: boolean;
}

const initialState: AdminCreatePageState = {
  pages: [],
  onePage: null,
  creating: false,
  fetching: false,
  fetchingOne: false,
  editPageLoading: false,
  pageDeleteLoading: false,
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

    builder
      .addCase(fetchOnePage.pending, (state) => {
        state.fetchingOne = true;
      })
      .addCase(fetchOnePage.fulfilled, (state, { payload }) => {
        state.onePage = payload;
        state.fetchingOne = false;
      })
      .addCase(fetchOnePage.rejected, (state) => {
        state.fetchingOne = false;
      });

    builder
      .addCase(fetchAllPages.pending, (state) => {
        state.fetching = true;
      })
      .addCase(fetchAllPages.fulfilled, (state, { payload }) => {
        state.pages = payload;
        state.fetching = false;
      })
      .addCase(fetchAllPages.rejected, (state) => {
        state.fetching = false;
      });

    builder
      .addCase(editPage.pending, (state) => {
        state.editPageLoading = true;
      })
      .addCase(editPage.fulfilled, (state) => {
        state.editPageLoading = false;
      })
      .addCase(editPage.rejected, (state) => {
        state.editPageLoading = false;
      });

    builder
      .addCase(deletePage.pending, (state) => {
        state.pageDeleteLoading = true;
      })
      .addCase(deletePage.fulfilled, (state) => {
        state.pageDeleteLoading = false;
      })
      .addCase(deletePage.rejected, (state) => {
        state.pageDeleteLoading = false;
      });
  },
});

export const pageReducer = pageSlice.reducer;
export const selectOnePage = (state: RootState) => state.page.onePage;
export const selectPages = (state: RootState) => state.page.pages;
export const selectPageCreating = (state: RootState) => state.page.creating;
export const selectPageFetchingAll = (state: RootState) => state.page.fetching;
export const selectPageFetchingOne = (state: RootState) => state.page.fetchingOne;
export const selectEditPageLoading = (state: RootState) => state.page.editPageLoading;
export const selectDeletePageLoading = (state: RootState) => state.page.pageDeleteLoading;
