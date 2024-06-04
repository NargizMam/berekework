import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { vacancyBlockReducer } from '../../admin/widgets/vacancyBlock/model/VacancyBlockSlice';
import { authReducer } from '../../client/page/Auth/model/AuthSlice';
import storage from 'redux-persist/lib/storage';
import { persistReducer, FLUSH, PAUSE, PERSIST, PURGE, REGISTER, REHYDRATE, persistStore } from 'redux-persist';
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
  whitelist: ['user'],
};

const rootReducer = combineReducers({
  auth: persistReducer(usersPersistConfig, authReducer),
  vacancyBlock: vacancyBlockReducer,
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

export const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
