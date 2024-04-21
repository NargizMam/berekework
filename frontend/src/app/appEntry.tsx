import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { ThemeProvider } from '@mui/material';
// import BaseLayout from './layouts/BaseLayout';
import appTheme from './appTheme';
import '../index.css';
import { Provider } from 'react-redux';
import { store } from './store/store';
import App from './App';


ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <ThemeProvider theme={appTheme}>
          <App/>
        </ThemeProvider>
      </BrowserRouter>
    </Provider>
  </React.StrictMode>,
);
