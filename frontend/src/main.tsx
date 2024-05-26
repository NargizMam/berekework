import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { ThemeProvider } from '@mui/material';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { persistor, store } from './app/store/store';
import App from './app/App';
import './app/index.css';
import appTheme from './app/appTheme';
import { addInterceptors } from './app/axiosApi';
import { PrismicProvider } from '@prismicio/react';
import { prismicClient } from './app/prismicClient';
import { GOOGLE_CLIENT_ID } from './constants';
import { GoogleOAuthProvider } from '@react-oauth/google';

addInterceptors(store);

ReactDOM.createRoot(document.getElementById('root')!).render(
  <Provider store={store}>
    <GoogleOAuthProvider clientId={GOOGLE_CLIENT_ID}>
      <PersistGate persistor={persistor}>
        <BrowserRouter>
          <ThemeProvider theme={appTheme}>
            <PrismicProvider client={prismicClient}>
              <App/>
            </PrismicProvider>
          </ThemeProvider>
        </BrowserRouter>
      </PersistGate>
    </GoogleOAuthProvider>
  </Provider>,
);
