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
import EmployerProfile from '../client/page/employerProfile/ui/employerProfile';
import WarningMessage from '../widgets/WarningMessage/WarningMessages';
import ApplicantSettings from '../client/page/Applicant/ui/page/ApplicantSettings';
import ApplicantProfile from '../client/page/Applicant/ui/page/ApplicantProfile';
import ApplicantRefactor from '../client/page/Applicant/ui/page/ApplicantRefactor';
import { EmployerFormPage, EmployerPanelPage } from '../admin/page/employerPanel';
import PotentialEmployeesPage from '../client/page/PotentialEmployeesPage/PotentialEmployeesPage';
import TariffFormPage from '../admin/page/tariffPanel/ui/tariffFormPage';
import { ForEmployerPage } from '../client/page/ForEmployerPage';
import AboutUsPage from '../client/page/AboutUsPage/AboutUsPage';
// import { RatesBLock } from '../client/widgets/tariff/ui/ratesBLock';


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
          <Route path="/employers" element={<EmployerPanelPage/>}/>
          <Route path="/employers-submit" element={<EmployerFormPage/>}/>
          <Route path="/tariffs" element={<TariffPanelPage/>}/>
          <Route path="/tariffs-new" element={<TariffFormPage/>}/>
          <Route path="/tariffs-submit/:id" element={<TariffFormPage/>}/>
          <Route path="/vacancy" element={<VacancyPage/>}/>
          <Route path="/users" element={<UserPanelPage/>}/>
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
            <Container maxWidth="xl">
              <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/login" element={<LoginPage />} />
                <Route path="/register" element={<RegisterPage/>} />
                <Route path="/users" element={<UserPanelPage />} />
                <Route path="/vacancy" element={<VacancyPage />} />
                <Route path="/about-us" element={<AboutUsPage />} />
                {/*<Route path="/tariffs" element={<RatesBLock />} />*/}
                <Route path="/employersProfile/:id" element={<EmployerProfile/>} />
                <Route path="/potential-employees" element={<PotentialEmployeesPage />} />
                <Route path="/newApplicant" element={<ApplicantSettings />} />
                <Route path="/applicantProfile" element={<ApplicantProfile />} />
                <Route path="/applicantRefactor" element={<ApplicantRefactor />} />
                <Route path='/for-employer' element={<ForEmployerPage/>}/>
                <Route path="*" element={'Not found'} />
              </Routes>
            </Container>
        </ClientLayout>
      )}
    </>
  );
};

export default App;
