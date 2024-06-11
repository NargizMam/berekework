import { Route, Routes, useLocation, useRoutes } from 'react-router-dom';
import EmployeeProfile from '../client/widgets/EmployeeProfile/EmployeeProfile';
import NotFound from '../widgets/NotFound/NotFound';
import AdminLayout from './layouts/adminLayout/AdminLayout';
import { HomePage } from '../client/page/HomePage';
import { AdminMainPage } from '../admin/page/adminMainPage';
import Container from '@mui/material/Container';
import { LoginPage, RegisterPage } from '../client/page/Auth';
import { UserPanelPage } from '../admin/page/usersPanel';
import { VacancyPage } from '../admin/page/vacancyPanel';
import { useAppSelector } from './store/hooks';
import { selectUser } from '../client/page/Auth/model/AuthSlice';
import ProtectedRoute from '../shared/ProtectedRoute/ProtectedRoute';
import { ModeratorsPage } from '../admin/page/moderatorsPanel';
import ClientLayout from './layouts/clientLayout/ClientLayout';
import EmployerProfile from '../client/page/employerProfile/ui/employerProfile';
import { EmployerFormPage, EmployerPanelPage } from '../admin/page/employerPanel';
import { PotentialEmployeesPage } from '../client/page/PotentialEmployeesPage';
import { ForEmployerPage } from '../client/page/ForEmployerPage';
import AboutUsPage from '../client/page/AboutUsPage/AboutUsPage';
import NewsPage from '../client/widgets/lastNewsBlock/ui/NewsPage/NewsPage';
import { VacancyPageClient } from '../client/page/VacancyPage';
import { VacancyDetailPage } from '../pages/VacancyDetailPage';
import { UserProfileFormPage, UserProfilePage } from '../client/page/Profile';
import { EmployerEditPage } from '../client/page/employerProfile';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import SuccessMessage from '../widgets/WarningMessage/SuccessMessage';
import ErrorMessage from '../widgets/WarningMessage/ErrorMessage';

const App = () => {
  const user = useAppSelector(selectUser);
  const location = useLocation();
  const AdminRoutes = () => (
    <AdminLayout>
      <Container>
        <Routes>
          <Route path="/" element={<AdminMainPage />} />
          <Route
            path="/moderators"
            element={
              <ProtectedRoute isAllowed={user?.role === 'superadmin'}>
                <ModeratorsPage />
              </ProtectedRoute>
            }
          />
          <Route path="/employers" element={<EmployerPanelPage />} />
          <Route path="/employers-submit" element={<EmployerFormPage />} />
          <Route path="/vacancy" element={<VacancyPage />} />
          <Route path="/vacancy/:id" element={<VacancyDetailPage />} />
          <Route path="/users" element={<UserPanelPage />} />
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
      <SuccessMessage />
      <ErrorMessage />
      <ToastContainer />
      {location.pathname.startsWith('/admin') ? (
        adminRoutes
      ) : (
        <ClientLayout>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/users" element={<UserPanelPage />} />
            <Route path="/vacancy" element={<VacancyPageClient />} />
            <Route path="/vacancy/:id" element={<VacancyDetailPage />} />
            <Route path="/about-us" element={<AboutUsPage />} />
            <Route path="/employersProfile/:id" element={<EmployerProfile />} />
            <Route path="/edit-employer/:id" element={<EmployerEditPage />} />
            <Route path="/potential-employees" element={<PotentialEmployeesPage />} />
            <Route path="/userProfile" element={<UserProfilePage />} />
            <Route path="/userProfile-submit" element={<UserProfileFormPage />} />
            <Route path="/for-employer" element={<ForEmployerPage />} />
            <Route path="/news/:uid" element={<NewsPage />} />
            <Route path="/user/:id" element={<EmployeeProfile />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </ClientLayout>
      )}
    </>
  );
};
export default App;
