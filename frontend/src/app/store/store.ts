import { configureStore } from '@reduxjs/toolkit';
import { headingReducer } from '../../admin/page/HeadingAdmin/model/HeadingSlice';
import { vacancyBlockReducer } from '../../admin/widgets/vacancyBlock/model/VacancyBlockSlice';
import { lastNewsBlockReducer } from '../../admin/widgets/lastNewsBlock/model/lastNewsBlockSlice';
import { mainCardsReducer } from '../../admin/widgets/mainCards/model/mainCardsSlice';
import { pageReducer } from '../../admin/page/adminPages/model/adminCreatePageSlice';
import { headerReducer } from '../../admin/page/headerCreate/model/headerSlice';
import { footerReducer } from '../../admin/page/FooterAdmin/model/FooterSlice';


export const store = configureStore({
  reducer: {
    heading: headingReducer,
    vacancyBlock: vacancyBlockReducer,
    lastNewsBlock: lastNewsBlockReducer,
    mainCards: mainCardsReducer,
    page: pageReducer,
    header: headerReducer,
    footer: footerReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
