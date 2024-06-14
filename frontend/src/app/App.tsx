import { Route, Routes, useLocation, useRoutes } from 'react-router-dom';
import EmployeeProfile from '../client/widgets/EmployeeProfile/EmployeeProfile';
import NotFound from '../widgets/NotFound/NotFound';
import ScrollToAnchor from '../widgets/ScrollToAnchor/ScrollToAnchor';
import { HomePage } from '../client/page/HomePage';
import { AdminMainPage } from '../admin/page/adminMainPage';
import { LoginPage, RegisterPage } from '../client/page/Auth';
import { UserPanelPage } from '../admin/page/usersPanel';
import { VacancyPage } from '../admin/page/vacancyPanel';
import { useAppSelector } from './store/hooks';
import { selectEmployer, selectUser } from '../client/page/Auth/model/AuthSlice';
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
import Permit from '../shared/permit/Permit';
import { CreateVacancyForm } from '../client/widgets/createVacancyForm';
import { ApplicationPanelPage } from '../admin/page/applicationPanel/ui/ApplicationPanelPage';
import AdminBaseLayout from './layouts/adminLayout/AdminBaseLayout';

const App = () => {
  const user = useAppSelector(selectUser);
  const employer = useAppSelector(selectEmployer);
  const location = useLocation();

  const AdminRoutes = () => (
    <AdminBaseLayout>
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
        <Route path='/applications/:id' element={<ApplicationPanelPage />} />
      </Routes>
    </AdminBaseLayout>
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
      <ScrollToAnchor />
      {location.pathname.startsWith('/admin') ? (
        adminRoutes
      ) : (
        <ClientLayout>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/vacancy" element={<VacancyPageClient />} />
            <Route path="/vacancy/:id" element={<VacancyDetailPage />} />
            <Route path="/vacancy/edit/:id" element={<CreateVacancyForm />} />
            <Route path="/vacancy/edit/" element={<CreateVacancyForm />} />
            <Route path="/about-us" element={<AboutUsPage />} />
            <Route
              path="/employersProfile/:id"
              element={
                <Permit employerOnly>
                  <EmployerProfile />
                </Permit>
              }
            />
            <Route
              path="/edit-employer/:id"
              element={
                <Permit employerOnly>
                  <EmployerEditPage />
                </Permit>
              }
            />
            <Route
              path="/potential-employees"
              element={
                <Permit employerOnly>
                  <PotentialEmployeesPage />
                </Permit>
              }
            />
            <Route
              path="/userProfile"
              element={
                <Permit>
                  <UserProfilePage />
                </Permit>
              }
            />
            <Route path="/userProfile-submit" element={<UserProfileFormPage />} />
            <Route
              path="/for-employer"
              element={
                <ProtectedRoute isAllowed={(user && user.role !== 'user') || !!employer}>
                  <ForEmployerPage />
                </ProtectedRoute>
              }
            />
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
