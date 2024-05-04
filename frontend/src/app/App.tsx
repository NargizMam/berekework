import { Route, Routes, useLocation, useRoutes } from 'react-router-dom';
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
import { useAppSelector } from './store/hooks';
import { selectUser } from '../client/page/Auth/model/AuthSlice';
import ProtectedRoute from '../shared/ProtectedRoute/ProtectedRoute';
import { ModeratorsPage } from '../admin/page/moderatorsPanel';
import ClientLayout from './layouts/clientLayout/ClientLayout';
import EditPage from '../admin/page/editPage/ui/EditPage';

const AdminRoutes = () => (
  <AdminLayout>
    <Container>
      <Routes>
        <Route path="/" element={<AdminMainPage />} />
        <Route path="/header" element={<HeaderAdmin />} />
        <Route path="/pages" element={<AdminAllPages />} />
        <Route path="/moderators" element={<ModeratorsPage />} />
        <Route path="/pages/new-page" element={<AdminCreatePage />} />
        <Route path="/page/edit/:id" element={<EditPage />} />
        <Route path="/adminHeading" element={<HeadingAdmin />} />
        <Route path="/adminHeading:location" element={<HeadingDetail />} />
        <Route path="/*" element={<h3>Not found</h3>} />
      </Routes>
    </Container>
  </AdminLayout>
);

const App = () => {
  const user = useAppSelector(selectUser);
  const location = useLocation();

  const adminRoutes = useRoutes([
    {
      path: '/admin/*',
      element: (
        <ProtectedRoute isAllowed={user?.role === 'superadmin' || user?.role === 'admin'}>
          <AdminRoutes />
        </ProtectedRoute>
      ),
    },
  ]);

  return (
    <>
      {location.pathname.startsWith('/admin') ? (
        adminRoutes
      ) : (
        <ClientLayout>
          <Container>
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/register" element={<RegisterPage />} />
              <Route path="/login" element={<LoginPage />} />
              <Route path="/users" element={<UserPanelPage />} />
              <Route path="/vacancy" element={<VacancyPage />} />
              <Route path="/tariffs" element={<TariffPanelPage />} />
              <Route path="*" element={'Not found'} />
            </Routes>
          </Container>
        </ClientLayout>
      )}
    </>
  );
};

export default App;
