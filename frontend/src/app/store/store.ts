import { configureStore } from '@reduxjs/toolkit';
import { mainCardsReducer } from '../../shared/mainCards/model/mainCardsSlice.ts';
import { rateReducer } from '../../client/shared/ratesCard/model/ratesSlice.ts';

export const store = configureStore({
  reducer: {
    mainCards: mainCardsReducer,
    tariff: rateReducer
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
