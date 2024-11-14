import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import LookupNotarizationProfile from '../../../src/pages/services/LookupNotarizationProfile'; // Điều chỉnh đường dẫn cho phù hợp
import { toast } from 'react-toastify';
import NotarizationService from '../../services/notarization.service';

jest.mock('react-toastify', () => ({
  toast: {
    error: jest.fn(),
  },
}));

jest.mock('../../services/notarization.service', () => ({
  getStatusById: jest.fn(),
}));

describe('LookupNotarizationProfile', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('cho phép người dùng nhập mã hồ sơ vào trường "Look Up ID"', () => {
    render(<LookupNotarizationProfile />);
    const inputField = screen.getByPlaceholderText('Nhập mã số hồ sơ công chứng...');
    expect(inputField).toBeInTheDocument();
    fireEvent.change(inputField, { target: { value: '123456' } });
    expect(inputField.value).toBe('123456');
  });

  it('hiển thị lỗi khi nhấn "Tra cứu" nhưng không nhập mã hồ sơ', async () => {
    render(<LookupNotarizationProfile />);
    const searchButton = screen.getByText('Tra cứu');
    fireEvent.click(searchButton);

    await waitFor(() => {
      expect(toast.error).toHaveBeenCalledWith('Vui lòng nhập mã số hồ sơ công chứng');
    });
  });

  it('thực hiện tra cứu và hiển thị kết quả khi nhập mã hồ sơ hợp lệ', async () => {
    const mockResponse = {
      documentId: '123456',
      status: 'Đã hoàn tất',
    };
    NotarizationService.getStatusById.mockResolvedValue(mockResponse);

    render(<LookupNotarizationProfile />);
    const inputField = screen.getByPlaceholderText('Nhập mã số hồ sơ công chứng...');
    const searchButton = screen.getByText('Tra cứu');

    fireEvent.change(inputField, { target: { value: '123456' } });
    fireEvent.click(searchButton);

    expect(NotarizationService.getStatusById).toHaveBeenCalledWith('123456');

    await waitFor(() => {
      expect(screen.getByText('Trạng thái hồ sơ: Đã hoàn tất')).toBeInTheDocument();
    });
  });

  it('hiển thị thông báo khi mã hồ sơ không tồn tại', async () => {
    NotarizationService.getStatusById.mockRejectedValue({ response: { status: 404 } });

    render(<LookupNotarizationProfile />);
    const inputField = screen.getByPlaceholderText('Nhập mã số hồ sơ công chứng...');
    const searchButton = screen.getByText('Tra cứu');

    fireEvent.change(inputField, { target: { value: '000000' } });
    fireEvent.click(searchButton);

    expect(NotarizationService.getStatusById).toHaveBeenCalledWith('000000');

    await waitFor(() => {
      expect(
        screen.getByText('Không tìm thấy hồ sơ với mã số: 000000')
      ).toBeInTheDocument();
    });
  });

  it('kiểm tra tính hợp lệ của dữ liệu đầu vào', async () => {
    render(<LookupNotarizationProfile />);
    const inputField = screen.getByPlaceholderText('Nhập mã số hồ sơ công chứng...');
    fireEvent.change(inputField, { target: { value: 'abc123' } });
    expect(inputField.value).toBe('abc123');

    // Giả sử hệ thống chỉ chấp nhận số, kiểm tra xem có hiển thị lỗi không
    const searchButton = screen.getByText('Tra cứu');
    fireEvent.click(searchButton);

    await waitFor(() => {
      expect(toast.error).toHaveBeenCalledWith('Mã hồ sơ không hợp lệ');
    });
  });

  it('hiển thị trạng thái hồ sơ chính xác từ cơ sở dữ liệu', async () => {
    const mockResponse = {
      documentId: '789012',
      status: 'Đang xử lý',
    };
    NotarizationService.getStatusById.mockResolvedValue(mockResponse);

    render(<LookupNotarizationProfile />);
    const inputField = screen.getByPlaceholderText('Nhập mã số hồ sơ công chứng...');
    const searchButton = screen.getByText('Tra cứu');

    fireEvent.change(inputField, { target: { value: '789012' } });
    fireEvent.click(searchButton);

    expect(NotarizationService.getStatusById).toHaveBeenCalledWith('789012');

    await waitFor(() => {
      expect(screen.getByText('Trạng thái hồ sơ: Đang xử lý')).toBeInTheDocument();
    });
  });
});