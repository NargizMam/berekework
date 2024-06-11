import { Container } from '@mui/material';
import { Route, Routes, useLocation, useRoutes } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { AdminMainPage } from '../admin/page/adminMainPage';
import { EmployerFormPage, EmployerPanelPage } from '../admin/page/employerPanel';
import { ModeratorsPage } from '../admin/page/moderatorsPanel';
import { UserPanelPage } from '../admin/page/usersPanel';
import { VacancyPage } from '../admin/page/vacancyPanel';
import ScrollToAnchor from '../admin/shared/ScrollToAnchor/ScrollToAnchor';
import AboutUsPage from '../client/page/AboutUsPage/AboutUsPage';
import { LoginPage, RegisterPage } from '../client/page/Auth';
import { selectUser } from '../client/page/Auth/model/AuthSlice';
import { EmployerEditPage } from '../client/page/employerProfile';
import EmployerProfile from '../client/page/employerProfile/ui/employerProfile';
import { ForEmployerPage } from '../client/page/ForEmployerPage';
import { HomePage } from '../client/page/HomePage';
import { PotentialEmployeesPage } from '../client/page/PotentialEmployeesPage';
import { UserProfileFormPage, UserProfilePage } from '../client/page/Profile';
import { VacancyPageClient } from '../client/page/VacancyPage';
import EmployeeProfile from '../client/widgets/EmployeeProfile/EmployeeProfile';
import NewsPage from '../client/widgets/lastNewsBlock/ui/NewsPage/NewsPage';
import { VacancyDetailPage } from '../pages/VacancyDetailPage';
import Permit from '../shared/permit/Permit';
import ProtectedRoute from '../shared/ProtectedRoute/ProtectedRoute';
import NotFound from '../widgets/NotFound/NotFound';
import WarningMessage from '../widgets/WarningMessage/WarningMessages';
import AdminLayout from './layouts/adminLayout/AdminLayout';
import ClientLayout from './layouts/clientLayout/ClientLayout';
import { useAppSelector } from './store/hooks';

const App = () => {
	const user = useAppSelector(selectUser);
	const location = useLocation();
	
	const AdminRoutes = () => (
		<AdminLayout>
			<Container>
				<Routes>
					<Route path='/' element={<AdminMainPage />} />
					<Route
						path='/moderators'
						element={
							<ProtectedRoute isAllowed={user?.role === 'superadmin'}>
								<ModeratorsPage />
							</ProtectedRoute>
						}
					/>
					<Route path='/employers' element={<EmployerPanelPage />} />
					<Route path='/employers-submit' element={<EmployerFormPage />} />
					<Route path='/vacancy' element={<VacancyPage />} />
					<Route path='/vacancy/:id' element={<VacancyDetailPage />} />
					<Route path='/users' element={<UserPanelPage />} />
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
			)
		}
	]);
	
	return (
		<>
			<WarningMessage />
			<ToastContainer />
			<ScrollToAnchor />
			{location.pathname.startsWith('/admin') ? (
				adminRoutes
			) : (
				<ClientLayout>
					<Routes>
						<Route path='/' element={<HomePage />} />
						<Route path='/register' element={<RegisterPage />} />
						<Route path='/login' element={<LoginPage />} />
						<Route path='/users' element={<UserPanelPage />} />
						<Route path='/vacancy' element={<VacancyPageClient />} />
						<Route path='/vacancy/:id' element={<VacancyDetailPage />} />
						<Route path='/about-us' element={<AboutUsPage />} />
						<Route
							path='/employersProfile/:id'
							element={
								<Permit employerOnly>
									<EmployerProfile />
								</Permit>
							}
						/>
						<Route
							path='/edit-employer/:id'
							element={
								<Permit employerOnly>
									<EmployerEditPage />
								</Permit>
							}
						/>
						<Route
							path='/potential-employees'
							element={
								<Permit employerOnly>
									<PotentialEmployeesPage />
								</Permit>
							}
						/>
						<Route
							path='/userProfile'
							element={
								<Permit>
									<UserProfilePage />
								</Permit>
							}
						/>
						<Route path='/userProfile-submit' element={<UserProfileFormPage />} />
						<Route path='/for-employer' element={<ForEmployerPage />} />
						<Route path='/news/:uid' element={<NewsPage />} />
						<Route path='/user/:id' element={<EmployeeProfile />} />
						<Route path='*' element={<NotFound />} />
					</Routes>
				</ClientLayout>
			)}
		</>
	);
	
 };
export default App;
