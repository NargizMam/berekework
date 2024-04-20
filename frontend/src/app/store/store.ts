import { configureStore } from '@reduxjs/toolkit';
import { headingReducer } from '../../pages/HeadingAdmin/model/HeadingSlice';
import { mainCardsReducer } from '../../shared/mainCards/model/mainCardsSlice';
import { vacancyBlockReducer } from '../../widgets/vacancyBlock/model/VacancyBlockSlice';
import {adminMainPageReducer} from "../../pages/adminPages/model/AdminMainPageSlice";

export const store = configureStore({
  reducer: {
    heading: headingReducer,
    vacancyBlock: vacancyBlockReducer,
    mainCards: mainCardsReducer,
    adminMainPage: adminMainPageReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
