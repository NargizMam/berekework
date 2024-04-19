import '../App.css';
import { Route, Routes } from 'react-router-dom';
import { HeadingAdmin } from '../pages/HeadingAdmin';
import { HeadingDetail } from '../pages/HeadingAdmin';
import AppContainer from './appContainer';
import AboutUsBlock from '../widgets/AboutUsBlock/AboutUsBlock';

const App = () => (
    <AppContainer>
        <Routes>
          <Route path="/" element={<AboutUsBlock/>} />
          <Route path="/adminHeading" element={<HeadingAdmin/>} />
          <Route path="/adminHeading/:location" element={<HeadingDetail/>} />
        </Routes>
    </AppContainer>
);

export default App;
