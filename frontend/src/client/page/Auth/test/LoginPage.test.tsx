/* eslint-disable */
import { fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import { LoginPage } from '../ui/LoginPage';
import { renderWithProviders } from '../../../../testUtils/renderWithProviders';
import { login } from '../api/AuthThunk';
import configureStore from 'redux-mock-store';
import { thunk } from 'redux-thunk';

jest.mock('../../../../app/store/hooks', () => ({
  // @ts-ignore
  useAppDispatch: () => jest.fn().mockReturnValue({ unwrap: () => jest.fn() }),
  useAppSelector: () => jest.fn(),
}));

// @ts-ignore
const mockStore = configureStore([thunk]);

jest.mock('../api/AuthThunk');
const mockedLogin = login as jest.MockedFunction<typeof login>;

jest.mock('@prismicio/client', () => ({
  createClient: jest.fn(),
}));

describe('LoginPage component', () => {
  // @ts-ignore
  let store: any;

  beforeAll(() => {
    store = mockStore({});
    store.dispatch = jest.fn(store.dispatch);
  });

  test('renders initial state of LoginPage state', () => {
    const { getByLabelText } = renderWithProviders(<LoginPage />);
    expect(getByLabelText(/e-mail/i)).toBeInTheDocument();
    expect(getByLabelText(/пароль/i)).toBeInTheDocument();
  });

  test('should enable the submit button when form is valid', () => {
    const { getByRole, getByLabelText } = renderWithProviders(<LoginPage />);
    fireEvent.change(getByLabelText(/e-mail/i), {
      target: { value: 'test@example.com' },
    });
    fireEvent.change(getByLabelText(/пароль/i), {
      target: { value: 'password' },
    });
    expect(getByRole('button', { name: /войти/i })).toBeEnabled();
  });

  test('should call the login action on form submit', async () => {
    // @ts-ignore
    mockedLogin.mockResolvedValue({} as any);

    const { getByLabelText, getByRole } = renderWithProviders(<LoginPage />);
    fireEvent.change(getByLabelText(/e-mail/i), {
      target: { value: 'test@example.com' },
    });
    fireEvent.change(getByLabelText(/пароль/i), {
      target: { value: 'password' },
    });

    fireEvent.click(getByRole('button', { name: /войти/i }));

    await waitFor(() => {
      expect(mockedLogin).toHaveBeenCalledWith({
        email: 'test@example.com',
        password: 'password',
      });
    });
  });

  test('should toggle password visibility', () => {
    const { getByLabelText } = renderWithProviders(<LoginPage />);
    const passwordInput = getByLabelText(/пароль/i);
    const toggleButton = getByLabelText(/toggle password visibility/i);

    expect(passwordInput).toHaveAttribute('type', 'password');

    fireEvent.click(toggleButton);
    expect(passwordInput).toHaveAttribute('type', 'text');

    fireEvent.click(toggleButton);
    expect(passwordInput).toHaveAttribute('type', 'password');
  });
});
