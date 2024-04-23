import { Route, Routes } from 'react-router-dom';
import AppContainer from './appContainer';
import HomePage from '../pages/CRM/HomePage/HomePage';
import '../App.css';
import { HeadingAdmin, HeadingDetail } from '../pages/CRM/HeadingAdmin';
import AdminLayout from './layouts/adminLayout/AdminLayout';
import { AdminMainPage } from '../pages/CRM/adminMainPage';
import { HeaderAdmin } from '../pages/CRM/headerCreate';
import { AdminAllPages, AdminCreatePage } from '../pages/CRM/adminPages';

const App = () => (
  <>
    <AppContainer>
      <Routes>
        <Route path="/client" element={<HomePage/>}/>
      </Routes>
    </AppContainer>
    <AdminLayout>
      <Routes>
        <Route path="/admin" element={<AdminMainPage/>}/>
        <Route path="/header" element={<HeaderAdmin/>}/>
        <Route path="/pages" element={<AdminAllPages/>}/>
        <Route path="/pages/new-page" element={<AdminCreatePage/>}/>

        <Route path="/adminHeading" element={<HeadingAdmin/>}/>
        <Route path="/adminHeading/:location" element={<HeadingDetail/>}/>
        <Route path="*" element={'Not found'}/>
      </Routes>
    </AdminLayout>
  </>

);

export default App;
