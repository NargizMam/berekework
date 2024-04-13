import { configureStore } from '@reduxjs/toolkit';
import { mainCardsReducer } from '../../shared/mainCards/model/mainCardsSlice.ts';
import { chooseBlockReducer } from '../../widgets/specialistBlock/model/chooseBlockSlice.ts';

export const store = configureStore({
  reducer: {
    mainCards: mainCardsReducer,
    chooseBlock: chooseBlockReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
