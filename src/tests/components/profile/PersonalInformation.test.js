import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import PersonalInformation from '../../../components/profile/PersonalInformation';

// Mock user data
const mockUser = {
  role: 'USER',
  isEmailVerified: true,
  name: 'Test User',
  email: 'test@example.com',
  phoneNumber: '0123456789',
  citizenId: '123456789',
  address: {
    province: 'Test City',
    district: 'Test District',
    town: 'Test Ward',
    street: 'Test Street',
  },
};

// Create mock store
const createMockStore = (initialState = {}) => {
  return configureStore({
    reducer: {
      user: () => ({ user: mockUser, ...initialState }),
    },
  });
};

describe('PersonalInformation', () => {
  let store;

  beforeEach(() => {
    store = createMockStore();
  });

  test('renders personal information section', () => {
    render(
      <Provider store={store}>
        <PersonalInformation />
      </Provider>,
    );

    expect(screen.getByText('Thông tin cá nhân')).toBeInTheDocument();
    expect(screen.getByText('Địa chỉ liên hệ')).toBeInTheDocument();
  });

  test('displays user data from Redux store', () => {
    render(
      <Provider store={store}>
        <PersonalInformation />
      </Provider>,
    );

    expect(screen.getByText(mockUser.name)).toBeInTheDocument();
    expect(screen.getByText(mockUser.email)).toBeInTheDocument();
    expect(screen.getByText(mockUser.phoneNumber)).toBeInTheDocument();
    expect(screen.getByText(mockUser.citizenId)).toBeInTheDocument();
  });

  test('displays address information', () => {
    render(
      <Provider store={store}>
        <PersonalInformation />
      </Provider>,
    );

    expect(screen.getByText(mockUser.address.province)).toBeInTheDocument();
    expect(screen.getByText(mockUser.address.district)).toBeInTheDocument();
    expect(screen.getByText(mockUser.address.town)).toBeInTheDocument();
    expect(screen.getByText(mockUser.address.street)).toBeInTheDocument();
  });

  test('opens edit modal on button click', async () => {
    render(
      <Provider store={store}>
        <PersonalInformation />
      </Provider>,
    );

    const editButton = screen.getByText('Chỉnh sửa');
    fireEvent.click(editButton);

    const modalTitle = screen.getByText('Cập nhật hồ sơ', {
      selector: 'h6.MuiTypography-h6',
    });
    expect(modalTitle).toBeInTheDocument();
  });

  test('closes modal when handleClose is called', async () => {
    render(
      <Provider store={store}>
        <PersonalInformation />
      </Provider>,
    );

    const editButton = screen.getByText('Chỉnh sửa');
    fireEvent.click(editButton);

    const backButton = screen.getByTestId('ArrowBackIcon').closest('button');
    fireEvent.click(backButton);

    expect(screen.queryByText('Cập nhật hồ sơ')).not.toBeInTheDocument();
  });

  test('updates form data when user data changes', () => {
    const { rerender } = render(
      <Provider store={store}>
        <PersonalInformation />
      </Provider>,
    );

    const updatedUser = {
      ...mockUser,
      name: 'Updated Name',
    };

    store = createMockStore({ user: updatedUser });

    rerender(
      <Provider store={store}>
        <PersonalInformation />
      </Provider>,
    );

    expect(screen.getByText('Updated Name')).toBeInTheDocument();
  });

  test('renders with responsive layout', () => {
    const { container } = render(
      <Provider store={store}>
        <PersonalInformation />
      </Provider>,
    );

    const flexBoxes = container.querySelectorAll('.MuiBox-root');
    expect(flexBoxes[0]).toHaveStyle({
      display: 'flex',
      flexDirection: 'column',
    });
  });
});
