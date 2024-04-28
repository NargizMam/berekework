import { Route, Routes } from 'react-router-dom';
import AdminLayout from './layouts/adminLayout/AdminLayout';
import HomePage from '../client/page/HomePage/HomePage';
import { AdminMainPage } from '../admin/page/adminMainPage';
import { HeaderAdmin } from '../admin/page/headerCreate';
import { AdminAllPages, AdminCreatePage } from '../admin/page/adminPages';
import { HeadingAdmin, HeadingDetail } from '../admin/page/HeadingAdmin';
import Container from '@mui/material/Container';
import { LoginPage, RegisterPage } from '../client/page/Auth';
import { UserPanelPage } from '../admin/page/usersPanel';
import { VacancyPage } from '../admin/page/vacancyPanel';
import { TariffPanelPage } from '../admin/page/tariffPanel';


const App = () => (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/admin/*" element={<AdminRoutes />} />
      <Route path="/register" element={<RegisterPage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/users" element={<UserPanelPage/>}/>
      <Route path="/vacancy" element={<VacancyPage/>}/>
      <Route path="/tariffs" element={<TariffPanelPage/>}/>
      <Route path="*" element={'Not found'} />
    </Routes>
);

const AdminRoutes = () => (
  <AdminLayout>
    <Container>
      <Routes>
        <Route path="/" element={<AdminMainPage />} />
        <Route path="/header" element={<HeaderAdmin />} />
        <Route path="/pages" element={<AdminAllPages />} />
        <Route path="/pages/new-page" element={<AdminCreatePage />} />
        <Route path="/adminHeading" element={<HeadingAdmin />} />
        <Route path="/adminHeading/:location" element={<HeadingDetail />} />
      </Routes>
    </Container>
  </AdminLayout>
);

export default App;
