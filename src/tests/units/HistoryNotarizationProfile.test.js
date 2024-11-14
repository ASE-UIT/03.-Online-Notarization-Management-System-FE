import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import { BrowserRouter } from 'react-router-dom';
import HistoryNotarizationProfile from '../../../src/pages/services/HistoryNotarizationProfile';
import NotarizationService from '../../../src/services/notarization.service';
import { toast } from 'react-toastify';

jest.mock('react-toastify', () => ({
  toast: {
    error: jest.fn(),
  },
}));

jest.mock('../../../src/services/notarization.service', () => ({
  getHistory: jest.fn(),
}));

const mockHistoryData = [
  {
    _id: 'NC001',
    createdAt: '2024-03-20T10:00:00Z',
    requesterInfo: { fullName: 'Nguyễn Văn A' },
    status: { status: 'pending' },
    notarizationService: { name: 'Công chứng hợp đồng' }
  },
  {
    _id: 'NC002',
    createdAt: '2024-03-21T10:00:00Z',
    requesterInfo: { fullName: 'Trần Thị B' },
    status: { status: 'completed' },
    notarizationService: { name: 'Công chứng di chúc' }
  }
];

describe('HistoryNotarizationProfile', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    NotarizationService.getHistory.mockResolvedValue(mockHistoryData);
  });

  const renderWithRouter = (component) => {
    return render(<BrowserRouter>{component}</BrowserRouter>);
  };

  it('hiển thị tiêu đề và văn bản mô tả chính xác', async () => {
    renderWithRouter(<HistoryNotarizationProfile />);
    
    expect(screen.getByText('Lịch sử công chứng')).toBeInTheDocument();
    expect(screen.getByText('Toàn bộ lịch sử công chứng của bạn sẽ hiển thị ở đây')).toBeInTheDocument();
  });

  it('kiểm tra các nút bộ lọc trạng thái hoạt động đúng', async () => {
    renderWithRouter(<HistoryNotarizationProfile />);

    await waitFor(() => {
      expect(NotarizationService.getHistory).toHaveBeenCalled();
    });

    // Kiểm tra nút "Tất cả"
    const allButton = screen.getByText('Tất cả');
    fireEvent.click(allButton);
    expect(screen.getAllByRole('row').length).toBeGreaterThan(1);

    // Kiểm tra nút "Chờ xử lý"
    const pendingButton = screen.getByText('Chờ xử lý');
    fireEvent.click(pendingButton);
    expect(screen.getByText('NC001')).toBeInTheDocument();
  });

  it('cho phép tìm kiếm hồ sơ', async () => {
    renderWithRouter(<HistoryNotarizationProfile />);

    await waitFor(() => {
      expect(NotarizationService.getHistory).toHaveBeenCalled();
    });

    const searchInput = screen.getByPlaceholderText('Tìm kiếm');
    fireEvent.change(searchInput, { target: { value: 'NC001' } });

    expect(screen.getByText('NC001')).toBeInTheDocument();
    expect(screen.queryByText('NC002')).not.toBeInTheDocument();
  });

  it('hiển thị thông báo lỗi khi API trả về lỗi 401', async () => {
    NotarizationService.getHistory.mockRejectedValue({ response: { status: 401 } });
    renderWithRouter(<HistoryNotarizationProfile />);

    await waitFor(() => {
      expect(toast.error).toHaveBeenCalledWith('Vui lòng đăng nhập');
    });
  });

  it('hiển thị bảng dữ liệu với các cột chính xác', async () => {
    renderWithRouter(<HistoryNotarizationProfile />);

    await waitFor(() => {
      expect(screen.getByText('Số hồ sơ')).toBeInTheDocument();
      expect(screen.getByText('Ngày công chứng')).toBeInTheDocument();
      expect(screen.getByText('Người yêu cầu')).toBeInTheDocument();
      expect(screen.getByText('Tình trạng')).toBeInTheDocument();
      expect(screen.getByText('Loại dịch vụ')).toBeInTheDocument();
    });
  });

  it('chuyển hướng khi nhấn nút tra cứu hồ sơ', () => {
    renderWithRouter(<HistoryNotarizationProfile />);
    const lookupButton = screen.getByText('Tra cứu hồ sơ');
    fireEvent.click(lookupButton);
    expect(window.location.pathname).toBe('/lookup');
  });

  it('hiển thị skeleton loading khi đang tải dữ liệu', async () => {
    NotarizationService.getHistory.mockImplementation(() => new Promise(resolve => setTimeout(resolve, 1000)));
    renderWithRouter(<HistoryNotarizationProfile />);
    
    expect(screen.getByTestId('skeleton-table')).toBeInTheDocument();
    
    await waitFor(() => {
      expect(screen.queryByTestId('skeleton-table')).not.toBeInTheDocument();
    });
  });
});