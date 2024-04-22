import { Route, Routes } from 'react-router-dom';
import AppContainer from './appContainer';
import HomePage from '../pages/HomePage/HomePage';
import '../App.css';

const App = () => (
    <AppContainer>
        <Routes>
          <Route path="/" element={<HomePage/>}/>



        </Routes>
    </AppContainer>
);

export default App;
