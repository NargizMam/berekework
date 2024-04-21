import { Route, Routes } from 'react-router-dom';
import AdminLayout from './layouts/adminLayout/AdminLayout';
import { AdminMainPage } from '../pages/adminMainPage';
import { AdminAllPages, AdminCreatePage } from '../pages/adminPages';
import { HeadingAdmin, HeadingDetail } from '../pages/HeadingAdmin';
import { HeaderAdmin } from '../pages/headerCreate';

const AdminApp = () => {
  return (
    <>
      <AdminLayout>
        <Routes>
          <Route path="/" element={<AdminMainPage />} />
          <Route path="/header" element={<HeaderAdmin />} />
          <Route path="/pages" element={<AdminAllPages />} />
          <Route path="/pages/new-page" element={<AdminCreatePage />} />

          <Route path="/adminHeading" element={<HeadingAdmin/>} />
          <Route path="/adminHeading/:location" element={<HeadingDetail/>} />
          <Route path="*" element={'Not found'} />
        </Routes>
      </AdminLayout>
    </>
  );
};

export default AdminApp;