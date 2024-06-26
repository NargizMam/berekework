import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { store } from './app/store/store';
import { ThemeProvider } from '@mui/material';
import App from './app/App';
import './index.css';
import appTheme from './app/appTheme';


ReactDOM.createRoot(document.getElementById('root')!).render(
  <Provider store={store}>
    <BrowserRouter>
      <ThemeProvider theme={appTheme}>
        <App/>
      </ThemeProvider>
    </BrowserRouter>
  </Provider>,
);
