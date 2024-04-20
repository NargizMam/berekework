import { configureStore } from '@reduxjs/toolkit';
import { headingReducer } from '../../pages/HeadingAdmin/model/HeadingSlice';
import { mainCardsReducer } from '../../shared/mainCards/model/mainCardsSlice';
import { vacancyBlockReducer } from '../../widgets/vacancyBlock/model/VacancyBlockSlice';
import { lastNewsBlockReducer } from '../../widgets/lastNewsBlock/model/lastNewsBlockSlice';

export const store = configureStore({
  reducer: {
    heading: headingReducer,
    vacancyBlock: vacancyBlockReducer,
    lastNewsBlock: lastNewsBlockReducer,
    mainCards: mainCardsReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
