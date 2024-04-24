import { configureStore } from '@reduxjs/toolkit';
import { mainCardsReducer } from '../../shared/mainCards/model/mainCardsSlice.ts';
import { lastNewsBlockReducer } from '../../admin/widgets/lastNews/blocks/model/blockSlice.ts';

export const store = configureStore({
  reducer: {
    mainCards: mainCardsReducer,
    lastNews: lastNewsBlockReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
