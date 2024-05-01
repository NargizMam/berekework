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
import Header from '../widgets/Header/ui/Header';
import { useAppSelector } from './store/hooks';
import { selectUser } from '../client/page/Auth/model/AuthSlice';
import ProtectedRoute from '../shared/ProtectedRoute/ProtectedRoute';


const App = () => {
  const user = useAppSelector(selectUser);
  // const AdminRoutes = () => (
  //   <AdminLayout>
  //     <Container>
  //       <Routes>
  //         <Route path="/" element={(
  //           <ProtectedRoute isAllowed={user && user.role === 'superadmin' || user && user.role === 'admin'}>
  //             <AdminMainPage/>
  //           </ProtectedRoute>
  //         )}/>
  //         <Route path="/header" element={(
  //           <ProtectedRoute isAllowed={user && user.role === 'superadmin' || user && user.role === 'admin'}>
  //             <HeaderAdmin/>
  //           </ProtectedRoute>
  //         )}/>
  //         <Route path="/pages" element={(
  //           <ProtectedRoute isAllowed={user && user.role === 'superadmin' || user && user.role === 'admin'}>
  //             <AdminAllPages/>
  //           </ProtectedRoute>
  //         )}/>
  //         <Route path="/pages/new-page" element={(
  //           <ProtectedRoute isAllowed={user && user.role === 'superadmin' || user && user.role === 'admin'}>
  //             <AdminCreatePage/>
  //           </ProtectedRoute>
  //         )}/>
  //         <Route path="/adminHeading" element={(
  //           <ProtectedRoute isAllowed={user && user.role === 'superadmin' || user && user.role === 'admin'}>
  //             <HeadingAdmin/>
  //           </ProtectedRoute>
  //         )}/>
  //         <Route path="/adminHeading:location" element={(
  //           <ProtectedRoute isAllowed={user && user.role === 'superadmin' || user && user.role === 'admin'}>
  //             <HeadingDetail/>
  //           </ProtectedRoute>
  //         )}/>
  //       </Routes>
  //     </Container>
  //   </AdminLayout>
  // );
  return (
    <>
      {user?.role === 'superadmin' || user?.role === 'admin' ?
        <AdminLayout>
          <Container>
            <Routes>
              <Route path="/" element={(
                <ProtectedRoute isAllowed={user && user.role === 'superadmin' || user && user.role === 'admin'}>
                  <AdminMainPage/>
                </ProtectedRoute>
              )}/>
              <Route path="/header" element={(
                <ProtectedRoute isAllowed={user && user.role === 'superadmin' || user && user.role === 'admin'}>
                  <HeaderAdmin/>
                </ProtectedRoute>
              )}/>
              <Route path="/pages" element={(
                <ProtectedRoute isAllowed={user && user.role === 'superadmin' || user && user.role === 'admin'}>
                  <AdminAllPages/>
                </ProtectedRoute>
              )}/>
              <Route path="/pages/new-page" element={(
                <ProtectedRoute isAllowed={user && user.role === 'superadmin' || user && user.role === 'admin'}>
                  <AdminCreatePage/>
                </ProtectedRoute>
              )}/>
              <Route path="/adminHeading" element={(
                <ProtectedRoute isAllowed={user && user.role === 'superadmin' || user && user.role === 'admin'}>
                  <HeadingAdmin/>
                </ProtectedRoute>
              )}/>
              <Route path="/adminHeading:location" element={(
                <ProtectedRoute isAllowed={user && user.role === 'superadmin' || user && user.role === 'admin'}>
                  <HeadingDetail/>
                </ProtectedRoute>
              )}/>
            </Routes>
          </Container>
        </AdminLayout>
        :
        <>
          <header>
            <Header/>
          </header>
          <Routes>
            <Route path="/" element={<HomePage/>}/>
            {/*<Route path="/admin/*" element={<AdminRoutes/>}/>*/}
            <Route path="/register" element={<RegisterPage/>}/>
            <Route path="/login" element={<LoginPage/>}/>
            <Route path="/users" element={<UserPanelPage/>}/>
            <Route path="/vacancy" element={<VacancyPage/>}/>
            <Route path="/tariffs" element={<TariffPanelPage/>}/>
            <Route path="*" element={'Not found'}/>
          </Routes>
        </>
      }

    </>
  );

};

export default App;
