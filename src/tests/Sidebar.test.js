import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import { Provider } from 'react-redux';
import { BrowserRouter as Router } from 'react-router-dom';
import Sidebar from '../../src/components/Sidebar';
import configureStore from 'redux-mock-store';

// Khởi tạo mock store
const mockStore = configureStore([]);

describe('Sidebar Component', () => {
  let store;
  let initialState;
  let adminState;
  let adminStore;

  beforeEach(() => {
    // Thiết lập trạng thái ban đầu của store
    initialState = {
      user: {
        user: {
          name: 'John Doe',
          role: 'user',
        },
      },
    };
    store = mockStore(initialState);
    // Thiết lập trạng thái ban đầu của store cho admin
    adminState = {
      user: {
        user: {
          name: 'Admin User',
          role: 'admin',
        },
      },
    };
    adminStore = mockStore(adminState);
  });

  test('renders Sidebar and toggles the sidebar open/close', () => {
    // Render Sidebar component
    render(
      <Provider store={store}>
        <Router>
          <Sidebar />
        </Router>
      </Provider>,
    );

    // Kiểm tra sidebar đang mở (icon đóng hiển thị)
    expect(screen.getByTestId('keyboarddoublearrowleft')).toBeInTheDocument();

    // Thực hiện click để đóng sidebar
    fireEvent.click(screen.getByTestId('keyboarddoublearrowleft'));

    // Kiểm tra icon để mở lại sidebar (icon mở hiển thị)
    expect(screen.getByTestId('keyboarddoublearrowright')).toBeInTheDocument();
  });

  test('renders correct items based on user role', () => {
    render(
      <Provider store={store}>
        <Router>
          <Sidebar />
        </Router>
      </Provider>,
    );

    // Kiểm tra các mục menu dựa trên vai trò 'user'
    expect(screen.getByText('Tạo hồ sơ công chứng')).toBeInTheDocument();
    expect(screen.getByText('Lịch sử')).toBeInTheDocument();
    expect(screen.getByText('Phiên công chứng')).toBeInTheDocument();
    expect(screen.getByText('Ví tài liệu')).toBeInTheDocument();
  });

  test('renders correct items based on admin role', () => {
    render(
      <Provider store={adminStore}>
        <Router>
          <Sidebar />
        </Router>
      </Provider>,
    );

    expect(screen.getByText('Dashboard')).toBeInTheDocument();
    expect(screen.getByText('Quản lý nhân viên')).toBeInTheDocument();
    expect(screen.getByText('Quản lý người dùng')).toBeInTheDocument();
    expect(screen.getByText('Quản lý công chứng')).toBeInTheDocument();
  });

  test('calls handleLogout when Logout menu is clicked', () => {
    render(
      <Provider store={store}>
        <Router>
          <Sidebar />
        </Router>
      </Provider>,
    );

    // Mở modal Đăng xuất khi nhấn vào nút "Đăng xuất"
    fireEvent.click(screen.getByText('Đăng xuất'));

    // Kiểm tra nội dung của modal
    expect(screen.getByText('Bạn có chắc chắn muốn đăng xuất?')).toBeInTheDocument();
  });

  test('navigates to profile when profile menu is clicked', () => {
    render(
      <Provider store={store}>
        <Router>
          <Sidebar />
        </Router>
      </Provider>,
    );

    // Kiểm tra việc nhấn vào menu Profile
    fireEvent.click(screen.getByText('John Doe'));

    // Kiểm tra nếu thành phần điều hướng đến trang profile
    expect(screen.getByText('John Doe')).toBeInTheDocument();
  });
});
