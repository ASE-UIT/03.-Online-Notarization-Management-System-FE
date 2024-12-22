import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import configureStore from 'redux-mock-store';
import Sidebar from '../components/Sidebar';

// Mock store setup
const mockStore = configureStore([]);
const initialState = {
  user: {
    user: {
      role: 'user',
      name: 'Test User',
    },
  },
};

// Mock router hooks
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useLocation: () => ({ pathname: '/dashboard' }),
  useNavigate: () => jest.fn(),
}));

describe('Sidebar Component', () => {
  let store;

  beforeEach(() => {
    store = mockStore(initialState);
    jest.clearAllMocks();
  });

  const renderSidebar = () => {
    return render(
      <Provider store={store}>
        <BrowserRouter>
          <Sidebar />
        </BrowserRouter>
      </Provider>,
    );
  };

  describe('Render Tests', () => {
    it('renders sidebar container', () => {
      renderSidebar();
      expect(screen.getByTestId('sidebar-container')).toBeInTheDocument();
    });

    it('renders user name', () => {
      renderSidebar();
      expect(screen.getByText('Test User')).toBeInTheDocument();
    });

    it('renders menu items based on role', () => {
      renderSidebar();
      expect(screen.getByText('Tạo hồ sơ công chứng')).toBeInTheDocument();
      expect(screen.getByText('Lịch sử')).toBeInTheDocument();
    });
  });

  describe('Sidebar State', () => {
    it('toggles sidebar on button click', () => {
      renderSidebar();
      const toggleButton = screen.getByTestId('sidebar-toggle');

      fireEvent.click(toggleButton);
      expect(screen.getByTestId('sidebar-container')).toHaveStyle({
        width: '5rem',
      });
    });
  });

  describe('Menu Interactions', () => {
    it('highlights selected menu item', () => {
      renderSidebar();
      const menuItem = screen.getByText('Lịch sử').closest('li');

      fireEvent.click(menuItem);
      expect(menuItem).toHaveStyle({
        backgroundColor: expect.any(String),
      });
    });
  });

  describe('Logout Flow', () => {
    it('shows logout confirmation dialog', () => {
      renderSidebar();
      const logoutButton = screen.getByText('Đăng xuất');

      fireEvent.click(logoutButton);
      expect(screen.getByText('Bạn có chắc chắn muốn đăng xuất?')).toBeInTheDocument();
    });
  });
});
