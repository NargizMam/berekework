import { Route, Routes, useLocation, useRoutes } from 'react-router-dom';
import EmployeeProfile from '../client/widgets/EmployeeProfile/EmployeeProfile';
import NotFound from '../widgets/NotFound/NotFound';
import AdminLayout from './layouts/adminLayout/AdminLayout';
import HomePage from '../client/page/HomePage/HomePage';
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
import WarningMessage from '../widgets/WarningMessage/WarningMessages';
import ApplicantSettings from '../client/page/Applicant/ui/page/ApplicantSettings';
import ApplicantProfile from '../client/page/Applicant/ui/page/ApplicantProfile';
import ApplicantRefactor from '../client/page/Applicant/ui/page/ApplicantRefactor';
import { EmployerFormPage, EmployerPanelPage } from '../admin/page/employerPanel';
import { PotentialEmployeesPage } from '../client/page/PotentialEmployeesPage';
import { ForEmployerPage } from '../client/page/ForEmployerPage';
import AboutUsPage from '../client/page/AboutUsPage/AboutUsPage';
import NewsPage from '../client/widgets/lastNewsBlock/ui/NewsPage/NewsPage';
import VacanciesPage from '../client/page/VacanciesPage/VacanciesPage';
import EmployerEdit from '../client/page/employerProfile/ui/EmployerEdit';

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
      <WarningMessage />
      {location.pathname.startsWith('/admin') ? (
        adminRoutes
      ) : (
        <ClientLayout>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/users" element={<UserPanelPage />} />
            <Route path="/vacancy" element={<VacanciesPage />} />
            <Route path="/about-us" element={<AboutUsPage />} />
            <Route path="/employersProfile/:id" element={<EmployerProfile />} />
            <Route path="/edit-employer/:id" element={<EmployerEdit/>} />
            <Route path="/potential-employees" element={<PotentialEmployeesPage />} />
            <Route path="/newApplicant" element={<ApplicantSettings />} />
            <Route path="/applicantProfile" element={<ApplicantProfile />} />
            <Route path="/applicantRefactor" element={<ApplicantRefactor />} />
            <Route path="/for-employer" element={<ForEmployerPage />} />
            <Route path="*" element={<NotFound />} />
            <Route path="/news/:uid" element={<NewsPage />} />
            <Route path="/user/:id" element={<EmployeeProfile />} />
          </Routes>
        </ClientLayout>
      )}
    </>
  );
};
export default App;
