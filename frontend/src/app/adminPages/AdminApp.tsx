import {Route, Routes} from "react-router-dom";
import AdminMainPage from "./AdminMainPage";
import AdminAllPages from "./adminCreatePage/AdminAllPages";
import Layout from "./dashboard/layout";
import AdminPageForm from "./adminCreatePage/AdminPageForm";

const AdminApp = () => {
    return (
        <>
            <Layout>
                <Routes>
                    <Route path="/" element={<AdminMainPage/>} />
                    <Route path="/pages" element={<AdminAllPages/>} />
                    <Route path="/pages/new-page" element={<AdminPageForm/>} />
                </Routes>
            </Layout>
        </>
    );
};

export default AdminApp;