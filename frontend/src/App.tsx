import './App.css';
import AppContainer from './app/appContainer';
import { Route, Routes } from 'react-router-dom';
import AboutUsBlock from './widgets/AboutUsBlock/AboutUsBlock';
import { HeadingAdmin, HeadingDetail } from './pages/HeadingAdmin';

const App = () => <>
  <AppContainer>
    <Routes>
      <Route path="/" element={<AboutUsBlock/>} />
      <Route path="/adminHeading" element={<HeadingAdmin/>} />
      <Route path="/adminHeading/:location" element={<HeadingDetail/>} />
    </Routes>
  </AppContainer>
</>;

export default App;
