import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { fetchMainCards, fetchSingleMainCard } from './mainCardsThunks';
import { MainCard } from './types';
import { RootState } from '../../../../app/store/store';

interface MainCardState {
  mainCards: MainCard[];
  mainCard: MainCard | null;
  mainCardsLoading: boolean;
  mainCardLoading: boolean;
}

const initialState: MainCardState = {
  mainCards: [],
  mainCard: null,
  mainCardsLoading: false,
  mainCardLoading: false,
};

export const mainCardSlice = createSlice({
  name: 'heading',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchMainCards.pending, (state) => {
        state.mainCardsLoading = true;
      })
      .addCase(fetchMainCards.fulfilled, (state, { payload: mainCards }: PayloadAction<MainCard[]>) => {
        state.mainCardsLoading = false;
        state.mainCards = mainCards;
      })
      .addCase(fetchMainCards.rejected, (state) => {
        state.mainCardsLoading = false;
      })

      .addCase(fetchSingleMainCard.pending, (state) => {
        state.mainCardLoading = true;
      })
      .addCase(fetchSingleMainCard.fulfilled, (state, { payload: mainCard }: PayloadAction<MainCard>) => {
        state.mainCardsLoading = false;
        state.mainCard = mainCard;
      })
      .addCase(fetchSingleMainCard.rejected, (state) => {
        state.mainCardLoading = false;
      });
  },
});

export const mainCardsReducer = mainCardSlice.reducer;
export const selectMainCards = (state: RootState) => state.mainCards.mainCards;
export const selectSingleMainCard = (state: RootState) => state.mainCards.mainCard;
