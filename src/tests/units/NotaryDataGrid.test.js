// src/tests/units/NotaryDataGrid.test.js

import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import NotaryDataGrid from '../../../pages/admin/notary-management/NotaryDataGrid';
import NotarizationService from '../../../services/notarization.service';
import '@testing-library/jest-dom';
import { BrowserRouter } from 'react-router-dom';

// Mock dịch vụ NotarizationService
jest.mock('../../../services/notarization.service');

describe('Trang Quản lý Hồ sơ Công chứng', () => {
  const mockData = {
    results: [
      {
        _id: '123456',
        createdAt: '2023-10-01T00:00:00.000Z',
        requesterInfo: { fullName: 'Nguyễn Văn A' },
        status: { status: 'completed' },
        notarizationService: { name: 'Dịch vụ A' },
      },
      {
        _id: '654321',
        createdAt: '2023-09-15T00:00:00.000Z',
        requesterInfo: { fullName: 'Trần Thị B' },
        status: { status: 'processing' },
        notarizationService: { name: 'Dịch vụ B' },
      },
    ],
  };

  beforeEach(() => {
    NotarizationService.getAllProfiles.mockResolvedValue(mockData);
  });

  test('Người dùng có thể nhập mã hồ sơ vào trường tìm kiếm', async () => {
    render(
      <BrowserRouter>
        <NotaryDataGrid />
      </BrowserRouter>
    );

    const searchInput = screen.getByPlaceholderText('Tìm kiếm...');
    fireEvent.change(searchInput, { target: { value: '123456' } });
    expect(searchInput.value).toBe('123456');
  });

  test('Kiểm tra tính hợp lệ của dữ liệu đầu vào trong trường tìm kiếm', async () => {
    render(
      <BrowserRouter>
        <NotaryDataGrid />
      </BrowserRouter>
    );

    const searchInput = screen.getByPlaceholderText('Tìm kiếm...');
    fireEvent.change(searchInput, { target: { value: 'abc123' } });
    expect(searchInput.value).toBe('abc123');
  });

  test('Hiển thị kết quả tìm kiếm đúng dựa trên mã hồ sơ được nhập', async () => {
    render(
      <BrowserRouter>
        <NotaryDataGrid />
      </BrowserRouter>
    );

    const searchInput = screen.getByPlaceholderText('Tìm kiếm...');
    fireEvent.change(searchInput, { target: { value: '123456' } });

    await waitFor(() => {
      expect(screen.getByText('Nguyễn Văn A')).toBeInTheDocument();
    });

    expect(screen.queryByText('Trần Thị B')).not.toBeInTheDocument();
  });

  test('Hiển thị thông báo khi không tìm thấy kết quả', async () => {
    render(
      <BrowserRouter>
        <NotaryDataGrid />
      </BrowserRouter>
    );

    const searchInput = screen.getByPlaceholderText('Tìm kiếm...');
    fireEvent.change(searchInput, { target: { value: '000000' } });

    await waitFor(() => {
      expect(screen.getByText('Không có dữ liệu')).toBeInTheDocument();
    });
  });

  test('Kiểm tra trạng thái hồ sơ hiển thị chính xác', async () => {
    render(
      <BrowserRouter>
        <NotaryDataGrid />
      </BrowserRouter>
    );

    await waitFor(() => {
      expect(screen.getByText('Nguyễn Văn A')).toBeInTheDocument();
      expect(screen.getByText('Hoàn tất')).toBeInTheDocument();
      expect(screen.getByText('Trần Thị B')).toBeInTheDocument();
      expect(screen.getByText('Đang xử lý')).toBeInTheDocument();
    });
  });
});