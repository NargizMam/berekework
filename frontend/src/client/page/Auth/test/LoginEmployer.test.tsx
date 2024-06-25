/* eslint-disable */
import { fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import configureMockStore from 'redux-mock-store';
import thunk, { ThunkMiddleware } from 'redux-thunk';
import { Middleware, AnyAction } from 'redux';
import { EmployerFormPage } from '../../../../admin/page/employerPanel';
import { createEmployer } from '../../../../admin/page/employerPanel/api/employerThunk';
import { RootState } from '../../../../app/store/store';
import { renderWithProviders } from '../../../../testUtils/renderWithProviders';

jest.mock('../../../../app/store/hooks', () => ({
  useAppDispatch: () => jest.fn().mockReturnValue({ unwrap: () => jest.fn() }),
  useAppSelector: jest.fn(),
}));

// Определите тип для вашего состояния
type State = RootState;

const middlewares: ThunkMiddleware<State, AnyAction>[] = [thunk as ThunkMiddleware<State, AnyAction>];
const mockStore = configureMockStore<State, any>(middlewares);

jest.mock('../../../../admin/page/employerPanel/api/employerThunk');
const mockedCreateEmployer = createEmployer as jest.MockedFunction<typeof createEmployer>;

jest.mock('@prismicio/client', () => ({
  createClient: jest.fn(),
}));

describe('EmployerFormPage component', () => {
  let store: ReturnType<typeof mockStore>;
  
  beforeEach(() => {
    store = mockStore({});
    store.dispatch = jest.fn();
  });
  
  test('renders initial state of EmployerFormPage', () => {
    const { getByLabelText } = renderWithProviders(<EmployerFormPage />, { store });
    expect(getByLabelText(/Email почта/i)).toBeInTheDocument();
    expect(getByLabelText(/Пароль/i)).toBeInTheDocument();
    expect(getByLabelText(/Название компании/i)).toBeInTheDocument();
  });
  
  test('should enable submit button on valid form', () => {
    const { getByRole, getByLabelText } = renderWithProviders(<EmployerFormPage />, { store });
    fireEvent.change(getByLabelText(/Email почта/i), {
      target: { value: 'test@example.com' },
    });
    fireEvent.change(getByLabelText(/Пароль/i), {
      target: { value: 'password' },
    });
    fireEvent.change(getByLabelText(/Название компании/i), {
      target: { value: 'Test Company' },
    });
    fireEvent.change(getByLabelText(/Вид деятельности/i), {
      target: { value: 'IT' },
    });
    fireEvent.change(getByLabelText(/Краткое описание/i), {
      target: { value: 'Описание компании' },
    });
    fireEvent.change(getByLabelText(/Действует с .... года/i), {
      target: { value: '2020' },
    });
    fireEvent.change(getByLabelText(/Адрес/i), {
      target: { value: 'Test Address' },
    });
    fireEvent.change(getByLabelText(/Контакты/i), {
      target: { value: '1234567890' },
    });
    
    expect(getByRole('button', { name: /Создать/i })).toBeEnabled();
  });
  
  test('should call createEmployer action on form submit', async () => {
    mockedCreateEmployer.mockResolvedValue({} as any);
    
    const { getByLabelText, getByRole } = renderWithProviders(<EmployerFormPage />, { store });
    fireEvent.change(getByLabelText(/Email почта/i), {
      target: { value: 'test@example.com' },
    });
    fireEvent.change(getByLabelText(/Пароль/i), {
      target: { value: 'password' },
    });
    fireEvent.change(getByLabelText(/Название компании/i), {
      target: { value: 'Test Company' },
    });
    fireEvent.change(getByLabelText(/Вид деятельности/i), {
      target: { value: 'IT' },
    });
    fireEvent.change(getByLabelText(/Краткое описание/i), {
      target: { value: 'Описание компании' },
    });
    fireEvent.change(getByLabelText(/Действует с .... года/i), {
      target: { value: '2020' },
    });
    fireEvent.change(getByLabelText(/Адрес/i), {
      target: { value: 'Test Address' },
    });
    fireEvent.change(getByLabelText(/Контакты/i), {
      target: { value: '1234567890' },
    });
    
    fireEvent.click(getByRole('button', { name: /Создать/i }));
    
    await waitFor(() => {
      expect(mockedCreateEmployer).toHaveBeenCalledWith({
        email: 'test@example.com',
        password: 'password',
        companyName: 'Test Company',
        industry: 'IT',
        description: 'Описание компании',
        foundationYear: '2020',
        address: 'Test Address',
        contacts: '1234567890',
        document: null,
        avatar: null,
      });
    });
  });
  
  test('should toggle password visibility', () => {
    const { getByLabelText } = renderWithProviders(<EmployerFormPage />, { store });
    const passwordInput = getByLabelText(/Пароль/i);
    const toggleButton = getByLabelText(/toggle password visibility/i);
    
    expect(passwordInput).toHaveAttribute('type', 'password');
    
    fireEvent.click(toggleButton);
    expect(passwordInput).toHaveAttribute('type', 'text');
    
    fireEvent.click(toggleButton);
    expect(passwordInput).toHaveAttribute('type', 'password');
  });
});
