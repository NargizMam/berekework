import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { vacancyBlockReducer } from '../../admin/widgets/vacancyBlock/model/VacancyBlockSlice';
import { authReducer } from '../../client/page/Auth/model/AuthSlice';
import storage from 'redux-persist/lib/storage';
import { persistReducer, FLUSH, PAUSE, PERSIST, PURGE, REGISTER, REHYDRATE, persistStore } from 'redux-persist';
import { usersReducer } from '../../admin/page/usersPanel/model/usersSlice';
import { vacancyReducer } from '../../admin/page/vacancyPanel/model/vacancySlice';
import { lastNewsReducer } from '../../admin/widgets/lastNews/blocks/model/blockSlice';
import { applicantReducer } from '../../client/page/Applicant/model/applicantSlice';
import { employerReducer } from '../../admin/page/employerPanel/model/employerSlice';
import { moderatorsReducer } from '../../admin/page/moderatorsPanel/model/moderatorsSlice';
import { chooseBlockReducer } from '../../client/widgets/specialistBlock/model/chooseBlockSlice';
import { warningMessageReducer } from '../../widgets/WarningMessage/warningMessageSlice';
import { createVacancyFormReducer } from '../../client/widgets/createVacancyForm/model/createVacancyFormSlice';

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
  applicant: applicantReducer,
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
