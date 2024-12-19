import React from 'react';
import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import EditUserProfileModal from '../../../src/components/modals/EditUserProfileModal';

const mockStore = configureStore([]);

describe('EditUserProfileModal', () => {
  let store;

  beforeEach(() => {
    store = mockStore({
      user: {
        user: {
          id: '1',
          name: 'Test User',
          email: 'test@example.com',
          role: 'user',
          phone: '123456789',
          identification: '123456789',
          city: 'Hanoi',
          district: 'Ba Dinh',
          ward: 'Ward 1',
          street: '123 Test Street',
          isEmailVerified: true,
        },
      },
    });
  });

  it('should render the modal with correct information', () => {
    render(
      <Provider store={store}>
        <EditUserProfileModal open={true} handleClose={jest.fn()} />
      </Provider>,
    );

    // Kiểm tra tiêu đề chính xác
    const headings = screen.getAllByRole('heading', { name: 'Cập nhật hồ sơ' });
    expect(headings.length).toBeGreaterThan(0);

    // Kiểm tra nút "Lưu thay đổi"
    expect(screen.getByText('Lưu thay đổi')).toBeInTheDocument();
  });

  it('should not render modal when open is false', () => {
    render(
      <Provider store={store}>
        <EditUserProfileModal open={false} handleClose={jest.fn()} />
      </Provider>,
    );

    // Modal không được hiển thị khi `open=false`
    expect(screen.queryByText('Cập nhật hồ sơ')).not.toBeInTheDocument();
  });
});
