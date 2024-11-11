import { render, screen, fireEvent } from '@testing-library/react';
import LookupNotaryProfile from '../../../pages/services/LookupNotarizationProfile';
import '@testing-library/jest-dom';
import NotarizationService from '../../../services/notarization.service';
import { BrowserRouter } from 'react-router-dom';

// Mock API
jest.mock('../../../services/notarization.service');

describe('Trang Tra cứu hồ sơ công chứng', () => {
  beforeEach(() => {
    NotarizationService.lookupProfile.mockClear();
  });

  test('Trường nhập mã hồ sơ hoạt động đúng', () => {
    render(
      <BrowserRouter>
        <LookupNotaryProfile />
      </BrowserRouter>
    );

    const inputField = screen.getByPlaceholderText('Nhập mã số hồ sơ công chứng...');
    fireEvent.change(inputField, { target: { value: '123456' } });
    expect(inputField.value).toBe('123456');
  });

  test('Hiển thị thông báo lỗi khi bỏ trống mã hồ sơ', () => {
    render(
      <BrowserRouter>
        <LookupNotaryProfile />
      </BrowserRouter>
    );

    const searchButton = screen.getByText('Tìm kiếm');
    fireEvent.click(searchButton);

    const errorMessage = screen.getByText(/vui lòng nhập mã hồ sơ hợp lệ/i);
    expect(errorMessage).toBeInTheDocument();
  });

  test('Nút "Tìm kiếm" hoạt động và hiển thị kết quả', async () => {
    const mockProfile = {
      id: '123456',
      status: 'Đã hoàn tất',
    };
    NotarizationService.lookupProfile.mockResolvedValue({ data: mockProfile });

    render(
      <BrowserRouter>
        <LookupNotaryProfile />
      </BrowserRouter>
    );

    const inputField = screen.getByPlaceholderText('Nhập mã số hồ sơ công chứng...');
    fireEvent.change(inputField, { target: { value: '123456' } });
    const searchButton = screen.getByText('Tìm kiếm');
    fireEvent.click(searchButton);

    const statusBox = await screen.findByTestId('status-box');
    expect(statusBox).toBeInTheDocument();
    expect(screen.getByText('Đã hoàn tất')).toBeInTheDocument();
  });
});