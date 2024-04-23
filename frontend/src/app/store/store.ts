import { configureStore } from '@reduxjs/toolkit';
import { headingReducer } from '../../pages/CRM/HeadingAdmin/model/HeadingSlice';
import { mainCardsReducer } from '../../widgets/mainCards/model/mainCardsSlice';
import { vacancyBlockReducer } from '../../widgets/vacancyBlock/model/VacancyBlockSlice';
import { lastNewsBlockReducer } from '../../widgets/lastNewsBlock/model/lastNewsBlockSlice';
import { pageReducer } from '../../pages/CRM/adminPages/model/adminCreatePageSlice';
import { headerReducer } from '../../pages/CRM/headerCreate/model/headerSlice';

export const store = configureStore({
  reducer: {
    heading: headingReducer,
    vacancyBlock: vacancyBlockReducer,
    lastNewsBlock: lastNewsBlockReducer,
    mainCards: mainCardsReducer,
    page: pageReducer,
    header: headerReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
