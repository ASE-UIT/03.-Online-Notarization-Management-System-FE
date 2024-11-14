import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import { MemoryRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { toast } from 'react-toastify';
import configureStore from 'redux-mock-store';
import SignInSide from '../../pages/signin/SignIn';
import { userLogin } from '../../../src/stores/actions/authAction';

jest.mock('../../../src/stores/actions/authAction');

jest.mock('react-toastify', () => ({
  toast: {
    success: jest.fn(),
    error: jest.fn(),
  },
}));
const mockStore = configureStore([]);

describe('SignInSide Component', () => {
  let store;

  beforeEach(() => {
    store = mockStore({
      auth: {
        loading: false,
      },
    });
  });

  const renderWithProviders = (ui, { route = '/' } = {}) => {
    window.history.pushState({}, 'Test page', route);

    return render(
      <Provider store={store}>
        <MemoryRouter initialEntries={[route]}>{ui}</MemoryRouter>
      </Provider>,
    );
  };

  test('renders SignInSide component', () => {
    renderWithProviders(<SignInSide />);

    expect(screen.getByTestId('.signinH1')).toBeInTheDocument();
    expect(screen.getByTestId('Loginbtn')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('your@email.com')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('••••••')).toBeInTheDocument();
    expect(screen.getByTestId('LoginwG')).toBeInTheDocument();
  });

  test('shows error messages for invalid inputs', () => {
    renderWithProviders(<SignInSide />);

    fireEvent.click(screen.getByTestId('Loginbtn'));

    expect(screen.getByText('Vui lòng điền đúng địa chỉ email.')).toBeInTheDocument();
    expect(screen.getByText('Mật khẩu phải chứa ít nhất 6 ký tự.')).toBeInTheDocument();
  });

  // test('calls userLogin on valid form submission', async () => {
  //   userLogin.mockResolvedValueOnce({ status: 400 });

  //   renderWithProviders(<SignInSide />);

  //   fireEvent.change(screen.getByPlaceholderText('your@email.com'), { target: { value: 'test@example.com' } });
  //   fireEvent.change(screen.getByPlaceholderText('••••••'), { target: { value: 'password' } });

  //   fireEvent.click(screen.getByTestId('Loginbtn'));
  //   await waitFor(()=>{
  //     expect(userLogin).toHaveBeenCalledWith({ email: 'test@example.com', password: 'password' });     
  //   })
  //   expect(toast.error);
  // });

  test('navigates to signup page on link click', () => {
    renderWithProviders(<SignInSide />);
    expect(screen.getByTestId('SignUp')).toHaveAttribute('href','/signup/');
  });

  test('opens forgot password modal on link click', () => {
    renderWithProviders(<SignInSide />);

    fireEvent.click(screen.getByTestId('ForgotPass'));

    expect(screen.getByText('Quên mật khẩu')).toBeInTheDocument();
  });

  test('calls signInWithGoogle on button click', () => {
    renderWithProviders(<SignInSide />);

    const originalOpen = window.open;
    window.open = jest.fn();

    fireEvent.click(screen.getByText('Đăng nhập với Google'));

    expect(window.open).toHaveBeenCalledWith(`${process.env.REACT_APP_API_BASE_URL}/auth/google`, '_self');

    window.open = originalOpen;
  });
});
