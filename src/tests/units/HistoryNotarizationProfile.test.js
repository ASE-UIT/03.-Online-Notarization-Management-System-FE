import React from 'react';
import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import HistoryNotarizationProfile from '../../pages/services/HistoryNotarizationProfile';

// Mock dependencies
jest.mock('react-toastify', () => ({
  toast: {
    error: jest.fn()
  }
}));

jest.mock('../../services/notarization.service', () => ({
  getHistory: jest.fn()
}));

jest.mock('../../components/services/HistoryDataTable', () => {
  return function MockHistoryDataTable() {
    return <div data-testid="history-data-table">History Table</div>;
  };
});

jest.mock('../../components/services/SkeletonHistoryDataTable', () => {
  return function MockSkeletonHistoryDataTable() {
    return <div data-testid="skeleton-table">Loading Table</div>;
  };
});

jest.mock('../../components/services/StatusFilterButton', () => {
  return function MockStatusFilterButton({ statusFilter }) {
    return <div data-testid="status-filter-button">{statusFilter}</div>;
  };
});

describe('HistoryNotarizationProfile Component', () => {
  const renderWithRouter = (component) => {
    return render(
      <BrowserRouter>
        {component}
      </BrowserRouter>
    );
  };

  it('renders header section correctly', () => {
    renderWithRouter(<HistoryNotarizationProfile />);
    
    expect(screen.getByText('Lịch sử công chứng')).toBeInTheDocument();
    expect(screen.getByText('Toàn bộ lịch sử công chứng của bạn sẽ hiển thị ở đây')).toBeInTheDocument();
    expect(screen.getByText('Tra cứu hồ sơ')).toBeInTheDocument();
  });

  it('renders status filter buttons', () => {
    renderWithRouter(<HistoryNotarizationProfile />);
    
    const statusFilters = [
      'Tất cả',
      'Chờ xử lý',
      'Đang xử lý',
      'Đang xác minh',
      'Sẵn sàng ký số',
      'Hoàn tất',
      'Không hợp lệ'
    ];

    statusFilters.forEach(status => {
      expect(screen.getByText(status)).toBeInTheDocument();
    });
  });

  it('renders search field', () => {
    renderWithRouter(<HistoryNotarizationProfile />);
    
    expect(screen.getByPlaceholderText('Tìm kiếm')).toBeInTheDocument();
  });

  it('renders loading skeleton initially', () => {
    renderWithRouter(<HistoryNotarizationProfile />);
    
    expect(screen.getByTestId('skeleton-table')).toBeInTheDocument();
  });
});