import '../App.css';
import { Route, Routes } from 'react-router-dom';
import { HeadingAdmin } from '../pages/HeadingAdmin';
import { HeadingDetail } from '../pages/HeadingAdmin';
import AppContainer from './appContainer';

const App = () => (
    <AppContainer>
        <Routes>
          {/*<Route path="/" element={<HomePage/>} />*/}
          <Route path="/adminHeading" element={<HeadingAdmin/>} />
          <Route path="/adminHeading/:location" element={<HeadingDetail/>} />
        </Routes>
    </AppContainer>
);

export default App;
