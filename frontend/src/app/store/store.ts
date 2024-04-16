import { configureStore } from '@reduxjs/toolkit';
import { headingReducer } from '../../pages/HeadingAdmin/model/HeadingSlice';
import { mainCardsReducer } from '../../shared/mainCards/model/mainCardsSlice';

export const store = configureStore({
  reducer: {
    heading: headingReducer,
    mainCards: mainCardsReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
