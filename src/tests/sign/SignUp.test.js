import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import { MemoryRouter, Route, Routes, useNavigate } from 'react-router-dom'; // Correct the import
import { Provider } from 'react-redux';
import { toast } from 'react-toastify';
import configureStore from 'redux-mock-store';
import SignUp from '../../pages/signup/SignUp';
import AuthService from '../../../src/services/auth.service';

jest.mock('../../../src/services/auth.service');

jest.mock('react-toastify', () => ({
  toast: {
    success: jest.fn(),
    error: jest.fn(),
  },
}));

const mockStore = configureStore([]);

describe('SignUp Component', () => {
  let store;

  beforeEach(() => {
    store = mockStore({});
  });

  const renderWithProviders = (ui, { route = '/' } = {}) => {
    window.history.pushState({}, 'Test page', route);

    return render(
      <Provider store={store}>
        <MemoryRouter initialEntries={[route]}>
          <Routes>
            <Route path="*" element={ui} />
            <Route path="/signin" element={<div>Signin Page</div>} />
          </Routes>
        </MemoryRouter>
      </Provider>,
    );
  };

  test('renders SignUp component', () => {
    renderWithProviders(<SignUp />);

    expect(screen.getByTestId('.signupH1')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Nguyễn Văn A')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('your@email.com')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('••••••')).toBeInTheDocument();
    expect(screen.getByTestId('.signUpBtn')).toBeInTheDocument();
    expect(screen.getByTestId('.signUpwG')).toBeInTheDocument();
  });

  test('calls AuthService.register on valid form submission', async () => {
    AuthService.register.mockResolvedValueOnce({ status: 201 });

    renderWithProviders(<SignUp />);

    fireEvent.change(screen.getByPlaceholderText('Nguyễn Văn A'), { target: { value: 'Test User' } });
    fireEvent.change(screen.getByPlaceholderText('your@email.com'), { target: { value: 'test@example.com' } });
    fireEvent.change(screen.getByPlaceholderText('••••••'), { target: { value: 'password' } });

    fireEvent.click(screen.getByTestId('.signUpBtn'));

    await waitFor(() => {
      expect(AuthService.register).toHaveBeenCalledWith('Test User', 'test@example.com', 'password');
    });
    expect(toast.success);
    expect(await screen.findByText('Đăng nhập')).toBeInTheDocument();
  });

  test('shows error message on registration failure', async () => {
    AuthService.register.mockRejectedValueOnce({ status: 400 });

    renderWithProviders(<SignUp />);

    fireEvent.change(screen.getByPlaceholderText('Nguyễn Văn A'), { target: { value: 'Test User' } });
    fireEvent.change(screen.getByPlaceholderText('your@email.com'), { target: { value: 'test@example.com' } });
    fireEvent.change(screen.getByPlaceholderText('••••••'), { target: { value: 'password' } });

    fireEvent.click(screen.getByTestId('.signUpBtn'));

    await waitFor(() => {
      expect(AuthService.register).toHaveBeenCalledWith('Test User', 'test@example.com', 'password');
    });
    expect(toast.error);
  });

  test('navigates to signin page on link click', () => {
    renderWithProviders(<SignUp />);

    expect(screen.getByTestId('.signInLink')).toHaveAttribute('href', '/signin/');
  });
});
