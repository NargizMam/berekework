import { Route, Routes } from 'react-router-dom';
import AdminMainPage from '../pages/adminPages/ui/AdminMainPage';
import AdminAllPages from '../pages/adminPages/adminCreatePage/AdminAllPages';
import AdminLayout from './layouts/adminLayout/AdminLayout';
import AdminPageForm from '../pages/adminPages/adminCreatePage/AdminPageForm';

const AdminApp = () => {
  return (
    <>
      <AdminLayout>
        <Routes>
          <Route path="/" element={<AdminMainPage />} />
          <Route path="/pages" element={<AdminAllPages />} />
          <Route path="/pages/new-page" element={<AdminPageForm />} />
        </Routes>
      </AdminLayout>
    </>
  );
};

export default AdminApp;