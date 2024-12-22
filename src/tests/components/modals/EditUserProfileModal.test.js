import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import EditUserProfileModal from '../../../components/modals/EditUserProfileModal';
import { updateUser } from '../../../stores/actions/userAction';

// Create mock store
const createMockStore = () => {
  const mockUser = {
    id: '1',
    name: 'Test User',
    email: 'test@example.com',
    phoneNumber: '0123456789',
    citizenId: '123456789012',
    province: 'Hà Nội',
    district: 'Ba Đình',
    town: 'Kim Mã',
    street: '123 Test St',
    role: 'USER',
    isEmailVerified: true,
  };

  return configureStore({
    reducer: {
      user: () => ({ user: mockUser }),
    },
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware({
        serializableCheck: false,
      }),
  });
};

// Mock dependencies
jest.mock('react-toastify', () => ({
  toast: {
    success: jest.fn(),
    error: jest.fn(),
  },
}));

jest.mock('../../../stores/actions/userAction', () => ({
  updateUser: jest.fn().mockImplementation(() => () => {
    return {
      unwrap: () => Promise.resolve(), 
    };
  }),
}));

describe('EditUserProfileModal', () => {
  let store;
  const mockHandleClose = jest.fn();

  beforeEach(() => {
    store = createMockStore();
    jest.clearAllMocks();
  });

  test('renders modal when open', () => {
    render(
      <Provider store={store}>
        <EditUserProfileModal open={true} handleClose={mockHandleClose} data-testid="profile-modal" />
      </Provider>,
    );

    const header = screen.getAllByRole('heading', {
      name: /Cập nhật hồ sơ/i,
      level: 6,
    })[0];
    expect(header).toBeInTheDocument();
  });

  test('populates form with user data', () => {
    render(
      <Provider store={store}>
        <EditUserProfileModal open={true} handleClose={mockHandleClose} />
      </Provider>,
    );

    expect(screen.getByDisplayValue('Test User')).toBeInTheDocument();
    expect(screen.getByDisplayValue('test@example.com')).toBeInTheDocument();
  });

  test('validates form input', async () => {
    const { toast } = require('react-toastify');

    render(
      <Provider store={store}>
        <EditUserProfileModal open={true} handleClose={mockHandleClose} />
      </Provider>,
    );

    const nameInput = screen.getByDisplayValue('Test User');
    fireEvent.change(nameInput, { target: { value: '123' } });

    const saveButton = screen.getByRole('button', { name: /Lưu thay đổi/i });
    fireEvent.click(saveButton);

    await waitFor(() => {
      expect(toast.error).toHaveBeenCalledWith('Vui lòng nhập Họ tên hợp lệ');
    });
  });

  test('handles form submission', async () => {
    const { updateUser } = require('../../../stores/actions/userAction');
    const { toast } = require('react-toastify');
  
    render(
      <Provider store={store}>
        <EditUserProfileModal open={true} handleClose={mockHandleClose} />
      </Provider>
    );
  
    // Click vào nút "Lưu thay đổi"
    const saveButton = screen.getByRole('button', { name: /Lưu thay đổi/i });
    fireEvent.click(saveButton);
  
    await waitFor(() => {
      expect(updateUser).toHaveBeenCalledWith({
        id: '1', 
        updatedUserInfo: expect.any(Object),
      });
    });
  

    await waitFor(() => {
      expect(toast.success).toHaveBeenCalledWith('Cập nhật thông tin thành công');
    });
  
    expect(mockHandleClose).toHaveBeenCalled();
  });
  

  test('validation failure - invalid name', async () => {
    const { toast } = require('react-toastify');

    render(
      <Provider store={store}>
        <EditUserProfileModal open={true} handleClose={mockHandleClose} />
      </Provider>,
    );

    const nameInput = screen.getByDisplayValue('Test User');
    fireEvent.change(nameInput, { target: { value: '123' } });

    const saveButton = screen.getByRole('button', { name: /Lưu thay đổi/i });
    fireEvent.click(saveButton);

    await waitFor(() => {
      expect(toast.error).toHaveBeenCalledWith('Vui lòng nhập Họ tên hợp lệ');
    });
  });
});
