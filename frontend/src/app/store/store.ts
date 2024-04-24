import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { mainCardsReducer } from '../../admin/widgets/mainCards/model/mainCardsSlice';
import { headingReducer } from '../../admin/page/HeadingAdmin/model/HeadingSlice';
import { vacancyBlockReducer } from '../../admin/widgets/vacancyBlock/model/VacancyBlockSlice';
import { lastNewsBlockReducer } from '../../admin/widgets/lastNewsBlock/model/lastNewsBlockSlice';
import { pageReducer } from '../../admin/page/adminPages/model/adminCreatePageSlice';
import { headerReducer } from '../../admin/page/headerCreate/model/headerSlice';
import { authReducer } from '../../client/page/Auth/model/AuthSlice';
import storage from 'redux-persist/lib/storage';
import {
  persistReducer,
  FLUSH,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
  REHYDRATE,
  persistStore,
} from 'redux-persist';

const usersPersistConfig = {
  key: 'shop:users',
  storage: storage,
  whitelist: ['user'],
};

const rootReducer = combineReducers({
  auth: persistReducer(usersPersistConfig, authReducer),
  heading: headingReducer,
  vacancyBlock: vacancyBlockReducer,
  lastNewsBlock: lastNewsBlockReducer,
  mainCards: mainCardsReducer,
  page: pageReducer,
  header: headerReducer,
});

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, PAUSE, PERSIST, REHYDRATE, PURGE, REGISTER],
      },
    }),
});

export const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
