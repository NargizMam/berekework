import { configureStore } from '@reduxjs/toolkit';
import { mainCardsReducer } from '../../shared/mainCards/model/mainCardsSlice.ts';

export const store = configureStore({
  reducer: {
    mainCards: mainCardsReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
