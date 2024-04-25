import { configureStore } from '@reduxjs/toolkit';
import { headingReducer } from '../../admin/page/HeadingAdmin/model/HeadingSlice';
import { vacancyBlockReducer } from '../../admin/widgets/vacancyBlock/model/VacancyBlockSlice';
import { lastNewsBlockReducer } from '../../admin/widgets/lastNewsBlock/model/lastNewsBlockSlice';
import { mainCardsReducer } from '../../admin/widgets/mainCards/model/mainCardsSlice';
import { pageReducer } from '../../admin/page/adminPages/model/adminCreatePageSlice';
import { headerReducer } from '../../admin/page/headerCreate/model/headerSlice';
import { lastNewsReducer } from '../../admin/widgets/lastNews/blocks/model/blockSlice';


export const store = configureStore({
  reducer: {
    heading: headingReducer,
    vacancyBlock: vacancyBlockReducer,
    lastNewsBlock: lastNewsBlockReducer,
    mainCards: mainCardsReducer,
    lastNews: lastNewsReducer,
    page: pageReducer,
    header: headerReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;