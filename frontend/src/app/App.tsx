import { Route, Routes, useLocation, useRoutes } from 'react-router-dom';
import AdminLayout from './layouts/adminLayout/AdminLayout';
import HomePage from '../client/page/HomePage/HomePage';
import { AdminMainPage } from '../admin/page/adminMainPage';
import { HeaderAdmin } from '../admin/page/headerCreate';
import { AdminAllPages, AdminCreatePage } from '../admin/page/adminPages';
import { HeadingAdmin, HeadingDetail } from '../admin/page/HeadingAdmin';
import Container from '@mui/material/Container';
import { LoginPage, RegisterPage } from '../client/page/Auth';
import { useAppSelector } from './store/hooks';
import { selectUser } from '../client/page/Auth/model/AuthSlice';
import ProtectedRoute from '../shared/ProtectedRoute/ProtectedRoute';
import { ModeratorsPage } from '../admin/page/moderatorsPanel';
import ClientLayout from './layouts/clientLayout/ClientLayout';
import WarningMessage from '../widgets/WarningMessage/WarningMessages';
import ApplicantSettings from '../client/page/Applicant/ApplicantSettings';
import ApplicantProfile from '../client/page/Applicant/ApplicantProfile';
import ApplicantRefactor from '../client/page/Applicant/ApplicantRefactor';


const App = () => {
  const user = useAppSelector(selectUser);
  const location = useLocation();

  const AdminRoutes = () => (
    <AdminLayout>
      <Container>
        <Routes>
          <Route path="/" element={<AdminMainPage />} />
          <Route path="/header" element={<HeaderAdmin />} />
          <Route path="/pages" element={<AdminAllPages />} />
          <Route path="/moderators" element={
            <ProtectedRoute isAllowed={user?.role === 'superadmin'}>
              <ModeratorsPage/>
            </ProtectedRoute>} />
          <Route path="/pages/new-page" element={<AdminCreatePage />} />
          <Route path="/adminHeading" element={<HeadingAdmin />} />
          <Route path="/adminHeading:location" element={<HeadingDetail />} />
        </Routes>
      </Container>
    </AdminLayout>
  );
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
      <WarningMessage/>
      {location.pathname.startsWith('/admin') ? (
        adminRoutes
      ) : (
        <ClientLayout>
          <Container>
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/register" element={<RegisterPage />} />
              <Route path="/login" element={<LoginPage />} />
              <Route path="/newApplicant" element={<ApplicantSettings />} />
              <Route path="/applicantProfile" element={<ApplicantProfile />} />
              <Route path="/applicantRefactor" element={<ApplicantRefactor />} />
              <Route path="*" element={'Not found'} />
            </Routes>
          </Container>
        </ClientLayout>
      )}
    </>
  );
};

export default App;
