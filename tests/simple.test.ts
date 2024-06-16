import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import userEvent from '@testing-library/user-event';
import { Provider } from 'react-redux';
import { BrowserRouter as Router } from 'react-router-dom';
import { store } from '../frontend/src/app/store/store';
import { LoginPage } from '../frontend/src/client/page/Auth';

// Mock the AuthThunk functions
jest.mock('../frontend/src/client/page/Auth/api/AuthThunk', () => ({
	googleAuth: jest.fn(),
	login: jest.fn(() => ({
		unwrap: jest.fn().mockResolvedValueOnce({})
	})),
}));

describe('LoginPage', () => {
	beforeEach(() => {
		jest.clearAllMocks(); // Clear all mock calls before each test
	});
	
	test('renders LoginPage and checks initial state', () => {
		render(
			<Provider store={store}>
				<Router>
					<LoginPage />
				</Router>
				</Provider>
		);
		
		expect(screen.getByLabelText(/E-mail/i)).toBeInTheDocument();
		expect(screen.getByLabelText(/Пароль/i)).toBeInTheDocument();
		expect(screen.getByRole('button', { name: /Войти/i })).toBeDisabled();
	});
	
	test('enables the submit button when both email and password are filled', () => {
		render(
			<Provider store={store}>
				<Router>
					<LoginPage />
				</Router>
				</Provider>
		);
		
		userEvent.type(screen.getByLabelText(/E-mail/i), 'test@example.com');
		userEvent.type(screen.getByLabelText(/Пароль/i), 'password123');
		
		expect(screen.getByRole('button', { name: /Войти/i })).toBeEnabled();
	});
	
	test('calls the login function when the form is submitted', async () => {
		const { login } = require('../frontend/src/client/page/Auth/api/AuthThunk');
		render(
			<Provider store={store}>
				<Router>
					<LoginPage />
				</Router>
				</Provider>
		);
		
		userEvent.type(screen.getByLabelText(/E-mail/i), 'test@example.com');
		userEvent.type(screen.getByLabelText(/Пароль/i), 'password123');
		
		fireEvent.click(screen.getByRole('button', { name: /Войти/i }));
		
		expect(login).toHaveBeenCalledWith({ email: 'test@example.com', password: 'password123' });
	});
});
