import { configureStore } from '@reduxjs/toolkit';
import { headingReducer } from '../../pages/HeadingAdmin/model/HeadingSlice';
import { mainCardsReducer } from '../../shared/mainCards/model/mainCardsSlice';
import { vacancyBlockReducer } from '../../widgets/vacancyBlock/model/VacancyBlockSlice';
import { pageReducer } from '../../pages/adminPages/model/adminCreatePageSlice';

export const store = configureStore({
  reducer: {
    heading: headingReducer,
    vacancyBlock: vacancyBlockReducer,
    mainCards: mainCardsReducer,
    page: pageReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
