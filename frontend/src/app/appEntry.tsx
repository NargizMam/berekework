import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { ThemeProvider } from '@mui/material';
import BaseLayout from './layouts/BaseLayout.tsx';
import appTheme from './appTheme.ts';
import '../index.css';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <BrowserRouter>
      <ThemeProvider theme={appTheme}>
        <BaseLayout />
      </ThemeProvider>
    </BrowserRouter>
  </React.StrictMode>,
);
