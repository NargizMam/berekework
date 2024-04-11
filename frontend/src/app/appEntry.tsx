import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { ThemeProvider } from '@mui/material';
// import BaseLayout from './layouts/BaseLayout';
import appTheme from './appTheme';
import '../index.css';
import { store } from './store/store';
import { Provider } from 'react-redux';
import App from './App';

ReactDOM.createRoot(document.getElementById('root')!).render(
    <Provider store={store}>
      <BrowserRouter>
        <ThemeProvider theme={appTheme}>
          <App/>
        </ThemeProvider>
      </BrowserRouter>
    </Provider>,
);
