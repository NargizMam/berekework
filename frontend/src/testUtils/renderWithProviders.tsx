import React, { PropsWithChildren } from 'react';
import { render } from '@testing-library/react';
import type { RenderOptions } from '@testing-library/react';
import { Provider } from 'react-redux';
import { AppStore, persistor, RootState } from '../app/store/store';
import { setupStore } from '../app/store/store';
import { GOOGLE_CLIENT_ID } from '../constants';
import { PersistGate } from 'redux-persist/integration/react';
import { BrowserRouter } from 'react-router-dom';
import { ThemeProvider } from '@mui/material';
import appTheme from '../app/appTheme';
import { PrismicProvider } from '@prismicio/react';
import { prismicClient } from '../app/prismicClient';
import { GoogleOAuthProvider } from '@react-oauth/google';

interface ExtendedRenderOptions extends Omit<RenderOptions, 'queries'> {
  preloadedState?: Partial<RootState>;
  store?: AppStore;
}

export function renderWithProviders(ui: React.ReactElement, extendedRenderOptions: ExtendedRenderOptions = {}) {
  const { preloadedState = {}, store = setupStore(preloadedState), ...renderOptions } = extendedRenderOptions;

  const Wrapper = ({ children }: PropsWithChildren) => (
    <Provider store={store}>
      <GoogleOAuthProvider clientId={GOOGLE_CLIENT_ID || ''}>
        <PersistGate persistor={persistor}>
          <BrowserRouter>
            <ThemeProvider theme={appTheme}>
              <PrismicProvider client={prismicClient}>{children}</PrismicProvider>
            </ThemeProvider>
          </BrowserRouter>
        </PersistGate>
      </GoogleOAuthProvider>
    </Provider>
  );

  return {
    store,
    ...render(ui, { wrapper: Wrapper, ...renderOptions }),
  };
}
