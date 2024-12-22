import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import HistoryDetailModal from '../../../components/modals/HistoryDetailModal';


// Mock data
const mockNotarizationData = {
  _id: '123',
  status: { status: 'pending' },
  requesterInfo: {
    fullName: 'Test User',
    citizenId: '123456789',
    phoneNumber: '0123456789',
    email: 'test@example.com',
  },
  notarizationField: { name: 'Test Field' },
  notarizationService: { name: 'Test Service' },
  files: [{ filename: 'test.pdf' }, { filename: 'test.jpg' }],
};

const mockProps = {
  open: true,
  handleClose: jest.fn(),
  data: [mockNotarizationData],
  notaryId: '123',
  load: false,
};

describe('HistoryDetailModal', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('renders modal when open', () => {
    render(<HistoryDetailModal {...mockProps} />);

    expect(screen.getByText(/Chi tiết hồ sơ công chứng/i)).toBeInTheDocument();
  });

  test('handles loading state', () => {
    render(<HistoryDetailModal {...mockProps} load={true} />);

    expect(screen.getByRole('progressbar')).toBeInTheDocument();
  });

  test('displays user information correctly', () => {
    render(<HistoryDetailModal {...mockProps} />);

    expect(screen.getByText(mockNotarizationData.requesterInfo.fullName)).toBeInTheDocument();
    expect(screen.getByText(mockNotarizationData.requesterInfo.citizenId)).toBeInTheDocument();
  });

  test('renders files correctly', () => {
    render(<HistoryDetailModal {...mockProps} />);

    expect(screen.getByText('test.pdf')).toBeInTheDocument();
    expect(screen.getByText('test.jpg')).toBeInTheDocument();
  });

  test('shows correct status', () => {
    render(<HistoryDetailModal {...mockProps} />);

    expect(screen.getAllByText('Chờ xử lý')[0]).toBeInTheDocument();
  });

  test('handles close button click', () => {
    render(<HistoryDetailModal {...mockProps} />);

    const closeButton = screen.getByTestId('ArrowBackIcon').closest('button');
    fireEvent.click(closeButton);

    expect(mockProps.handleClose).toHaveBeenCalled();
  });

  test('updates step based on status', () => {
    const updatedData = [
      {
        ...mockNotarizationData,
        status: { status: 'completed' },
      },
    ];

    render(<HistoryDetailModal {...mockProps} data={updatedData} />);

    expect(screen.getAllByText('Hoàn tất')[0]).toBeInTheDocument();
  });

  test('shows support information', () => {
    render(<HistoryDetailModal {...mockProps} />);

    expect(screen.getByText(/Hỗ trợ khách hàng/i)).toBeInTheDocument();
    expect(screen.getByText(/1900-123-456/)).toBeInTheDocument();
  });
});
