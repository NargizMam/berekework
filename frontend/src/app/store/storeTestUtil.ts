import { configureStore, EnhancedStore } from '@reduxjs/toolkit';
import { AnyAction, Middleware } from 'redux';
import thunk, { ThunkMiddleware } from 'redux-thunk';
import { rootReducer, RootState } from './store'; // Импортируйте rootReducer и RootState

type State = RootState;

export const createTestStore = (preloadedState?: Partial<State>): EnhancedStore<State, AnyAction> => {
  const middlewares: Middleware<NonNullable<unknown>, State>[] = [thunk as unknown as ThunkMiddleware<State, AnyAction>];
  return configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(middlewares),
    preloadedState,
  });
};
