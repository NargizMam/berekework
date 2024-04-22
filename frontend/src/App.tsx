import './App.css';
import { Route, Routes } from 'react-router-dom';
import { HeadingAdmin, HeadingDetail } from './pages/HeadingAdmin';
import HomePage from './pages/HomePage/HomePage';
import AdminApp from './app/AdminApp';


const App = () => {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<HomePage/>}/>
        <Route path="/admin/*" element={<AdminApp/>} />
        <Route path="/adminHeading" element={<HeadingAdmin/>}/>
        <Route path="/adminHeading/:location" element={<HeadingDetail/>}/>
      </Routes>
    </div>
    );
};

export default App;
