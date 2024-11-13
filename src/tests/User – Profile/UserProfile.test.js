import React from 'react';
import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import UserProfile from '../../pages/profile/UserProfile';

// Khởi tạo mock store
const mockStore = configureStore([]);
const userMockData = {
  user: {
    name: 'Nguyễn Văn A', // Thay tên tùy ý
  },
};

describe('Kiểm tra component UserProfile', () => {
  let store;

  beforeEach(() => {
    // Tạo store với dữ liệu user mock
    store = mockStore({
      user: userMockData,
    });
  });

  it('Display correct username', () => {
    render(
      <Provider store={store}>
        <UserProfile />
      </Provider>,
    );

    // Xác định tên người dùng cụ thể bằng cách chọn role hoặc vị trí chính xác
    const userName = screen.getByRole('heading', { name: /Nguyễn Văn A/i }); // Tìm `h5` dựa trên role heading
    expect(userName).toBeInTheDocument();
  });

  it('Show skeleton information when loadingStatus = true', () => {
    render(
      <Provider store={store}>
        <UserProfile />
      </Provider>,
    );

    // Skeleton nên hiển thị nếu đang loading
    const skeleton = screen.queryByTestId('skeleton-personal-info');
    expect(skeleton).not.toBeInTheDocument(); // Vì trạng thái `loadingStatus` là false
  });

  it('Show image download button', () => {
    render(
      <Provider store={store}>
        <UserProfile />
      </Provider>,
    );

    // Kiểm tra nút tải ảnh mới có mặt
    const uploadButton = screen.getByText(/Tải ảnh mới lên/i);
    expect(uploadButton).toBeInTheDocument();
  });
});
