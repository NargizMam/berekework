import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { authReducer } from '../../client/page/Auth/model/AuthSlice';
import storage from 'redux-persist/lib/storage';
import { FLUSH, PAUSE, PERSIST, persistReducer, persistStore, PURGE, REGISTER, REHYDRATE } from 'redux-persist';
import { usersReducer } from '../../feachers/user/usersSlice';
import { lastNewsReducer } from '../../admin/widgets/lastNews/blocks/model/blockSlice';
import { employerReducer } from '../../admin/page/employerPanel/model/employerSlice';
import { moderatorsReducer } from '../../admin/page/moderatorsPanel/model/moderatorsSlice';
import { chooseBlockReducer } from '../../client/widgets/specialistBlock/model/chooseBlockSlice';
import { warningMessageReducer } from '../../widgets/WarningMessage/warningMessageSlice';
import { createVacancyFormReducer } from '../../client/widgets/createVacancyForm/model/createVacancyFormSlice';
import { vacancyReducer } from '../../feachers/vacancy/vacancySlice';
import { applicationReducer } from '../../feachers/aplication/applicationSlice';

const usersPersistConfig = {
  key: 'shop:users',
  storage: storage,
  whitelist: ['user', 'employer'],
};

const rootReducer = combineReducers({
  auth: persistReducer(usersPersistConfig, authReducer),
  lastNews: lastNewsReducer,
  users: usersReducer,
  vacancy: vacancyReducer,
  moderator: moderatorsReducer,
  application: applicationReducer,
  chooseBlock: chooseBlockReducer,
  employerAdmin: employerReducer,
  warningMessage: warningMessageReducer,
  createVacancyForm: createVacancyFormReducer,
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

export const setupStore = (preloadedState?: Partial<RootState>) => configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, PAUSE, PERSIST, REHYDRATE, PURGE, REGISTER],
      },
    }),
  preloadedState,
});

export const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;
export type AppStore = ReturnType<typeof setupStore>;
export type AppDispatch = typeof store.dispatch;
