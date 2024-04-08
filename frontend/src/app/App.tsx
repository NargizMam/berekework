import '../App.css';
import { Route, Routes } from 'react-router-dom';
import { HeadingAdmin } from '../pages/HeadingAdmin';
import { HeadingDetail } from '../pages/HeadingAdmin';

const App = () => (
    <>
        <Routes>
          {/*<Route path="/" element={<HomePage/>} />*/}
          <Route path="/adminHeading" element={<HeadingAdmin/>} />
          <Route path="/adminHeading/:location" element={<HeadingDetail/>} />
        </Routes>
    </>
);

export default App;
