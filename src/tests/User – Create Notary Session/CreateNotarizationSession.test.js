import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom'; // Import jest-dom
import CreateNotarizationSession from '../../../src/pages/services/CreateNotarizationSession';
import SessionService from '../../services/session.service';
import UserService from '../../services/user.service';
import NotarizationService from '../../services/notarization.service'; // Đường dẫn đúng đến module
jest.mock('../../services/notarization.service');

jest.spyOn(SessionService, 'getAllSessions').mockResolvedValue([
  { id: 1, sessionName: 'Session 1', createdBy: '123' },
  { id: 2, sessionName: 'Session 2', createdBy: '456' },
]);

// Mock API response
jest.mock('../../../src/services/session.service', () => ({
  getAllSessions: jest.fn(), // Đảm bảo đây là mock hàm
}));
jest.mock('../../../src/services/user.service');

describe('CreateNotarizationSession Component', () => {
  it('renders component with correct elements', () => {
    render(<CreateNotarizationSession />);
    expect(screen.getByText(/Tạo phiên công chứng nhiều người/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /Tạo phiên công chứng/i })).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/Tìm kiếm phiên công chứng.../i)).toBeInTheDocument();
  });

  it('shows loading skeletons while fetching sessions', async () => {
    jest.spyOn(SessionService, 'getAllSessions').mockImplementation(() => new Promise(() => {})); // Mock API
    render(<CreateNotarizationSession />);

    // Kiểm tra xem Skeleton có hiển thị hay không
    expect(screen.getAllByTestId('loading-skeleton')).toHaveLength(24);
  });

  beforeEach(() => {
    jest.clearAllMocks(); // Đảm bảo không có state hoặc mock nào lưu từ trước
  });

  it('fetches and displays sessions', async () => {
    // Mock API data
    const mockSessions = [
      { id: 1, sessionName: 'Phiên 1', createdBy: 'user1' },
      { id: 2, sessionName: 'Phiên 2', createdBy: 'user2' },
    ];
    const mockUser1 = { id: 'user1', name: 'Người dùng 1' };
    const mockUser2 = { id: 'user2', name: 'Người dùng 2' };

    SessionService.getAllSessions.mockResolvedValueOnce(mockSessions);
    UserService.getUserById.mockImplementation((id) => {
      if (id === 'user1') return Promise.resolve(mockUser1);
      if (id === 'user2') return Promise.resolve(mockUser2);
    });

    render(<CreateNotarizationSession />);

    // Kiểm tra Skeleton loading hiển thị
    expect(screen.getAllByTestId('loading-skeleton')).toBeTruthy();

    // Đợi API hoàn tất
    await waitFor(() => {
      expect(SessionService.getAllSessions).toHaveBeenCalledTimes(1);
    });
  });
});
