import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import theme from './app/appTheme';
import { Provider } from 'react-redux';
import { store } from './app/store/store';
import { ThemeProvider } from '@mui/material';
import { BrowserRouter } from 'react-router-dom';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <Provider store={store}>
    <BrowserRouter>
      <ThemeProvider theme={theme}>
        <App/>
      </ThemeProvider>
    </BrowserRouter>
  </Provider>
);
