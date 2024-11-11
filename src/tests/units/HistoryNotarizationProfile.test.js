import { render, screen, fireEvent } from '@testing-library/react';
import NotaryHistory from '../../../pages/services/HistoryNotarizationProfile';
import '@testing-library/jest-dom';
import NotarizationService from '../../../services/notarization.service';
import { BrowserRouter } from 'react-router-dom';

// Mock API
jest.mock('../../../services/notarization.service');

// Mock data
const mockData = [
  {
    id: '123456',
    date: '01/01/2023',
    requester: 'Nguyễn Văn A',
    status: 'Chờ xử lý',
    service: 'Công chứng hợp đồng',
  },
  // Add more mock records if necessary
];

describe('Trang Lịch sử công chứng', () => {
  beforeEach(() => {
    NotarizationService.getHistory.mockResolvedValue({ data: mockData });
  });

  test('Hiển thị tiêu đề và mô tả', () => {
    render(
      <BrowserRouter>
        <NotaryHistory />
      </BrowserRouter>
    );

    const title = screen.getByText('Lịch sử công chứng');
    expect(title).toBeInTheDocument();

    const description = screen.getByText(/Toàn bộ lịch sử công chứng của bạn sẽ hiển thị ở đây/i);
    expect(description).toBeInTheDocument();
  });

  test('Các nút bộ lọc hoạt động đúng', () => {
    render(
      <BrowserRouter>
        <NotaryHistory />
      </BrowserRouter>
    );

    const filterAllButton = screen.getByText('Tất cả');
    fireEvent.click(filterAllButton);
    // Kiểm tra kết quả lọc

    const filterPendingButton = screen.getByText('Chờ xử lý');
    fireEvent.click(filterPendingButton);
    // Kiểm tra chỉ các hồ sơ "Chờ xử lý" được hiển thị

    // Tương tự cho các nút lọc khác
  });

  test('Trường tìm kiếm hoạt động đúng', () => {
    render(
      <BrowserRouter>
        <NotaryHistory />
      </BrowserRouter>
    );

    const searchInput = screen.getByPlaceholderText('Tìm kiếm');
    fireEvent.change(searchInput, { target: { value: '123456' } });

    // Kiểm tra kết quả tìm kiếm hiển thị đúng
    const profileId = screen.getByText('123456');
    expect(profileId).toBeInTheDocument();
  });

  test('Bảng lịch sử công chứng hiển thị đúng', () => {
    render(
      <BrowserRouter>
        <NotaryHistory />
      </BrowserRouter>
    );

    const tableRows = screen.getAllByRole('row');
    expect(tableRows.length).toBeGreaterThan(1); // Bao gồm header

    const columns = ['Mã hồ sơ', 'Ngày yêu cầu', 'Người yêu cầu', 'Tình trạng', 'Dịch vụ'];
    columns.forEach((col) => {
      const columnHeader = screen.getByText(col);
      expect(columnHeader).toBeInTheDocument();
    });
  });
});