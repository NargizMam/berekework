import '../App.css';
import {Route, Routes} from 'react-router-dom';
import {HeadingAdmin, HeadingDetail} from '../pages/HeadingAdmin';
import AppContainer from './appContainer';
import AdminApp from "./AdminApp";
import HomePage from '../pages/HomePage/HomePage';

const App = () => (
    <AppContainer>
        <Routes>
          <Route path="/" element={<HomePage/>}/>

          // ADMIN
          <Route path="/admin/*" element={<AdminApp/>} />
          <Route path="/adminHeading" element={<HeadingAdmin/>} />
          <Route path="/adminHeading/:location" element={<HeadingDetail/>} />
        </Routes>
    </AppContainer>
);

export default App;
