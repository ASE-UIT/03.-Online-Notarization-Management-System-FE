import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import NotaryDocumentDetailsModal from '../../../components/modals/NotaryDocumentDetailsModal';
import NotarizationService from '../../../services/notarization.service';

// Mock services
jest.mock('../../../services/notarization.service', () => ({
  uploadNotarizationDocument: jest.fn(),
}));

// Mock toast
jest.mock('react-toastify', () => ({
  toast: {
    success: jest.fn(),
    error: jest.fn(),
  },
}));

// Mock test data
const mockNotarizationData = {
  _id: '123456',
  status: 'pending',
  requesterInfo: {
    fullName: 'Test User',
    citizenId: '123456789',
    phoneNumber: '0123456789',
    email: 'test@example.com',
  },
  notaryField: { name: 'Test Field' },
  notaryService: { name: 'Test Service' },
  files: [
    new File(['test'], 'test.pdf', { type: 'application/pdf' }),
    new File(['test'], 'test.jpg', { type: 'image/jpeg' }),
  ],
};

describe('NotaryDocumentDetailsModal', () => {
  const mockHandleClose = jest.fn();
  const defaultProps = {
    open: true,
    handleClose: mockHandleClose,
    notarizationData: mockNotarizationData,
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('renders modal when open', () => {
    render(<NotaryDocumentDetailsModal {...defaultProps} />);

    expect(screen.getByText(/Chi tiết hồ sơ công chứng/i)).toBeInTheDocument();
  });

  test('displays correct user information', () => {
    render(<NotaryDocumentDetailsModal {...defaultProps} />);

    expect(screen.getByText(mockNotarizationData.requesterInfo.fullName)).toBeInTheDocument();
    expect(screen.getByText(mockNotarizationData.requesterInfo.citizenId)).toBeInTheDocument();
    expect(screen.getByText(mockNotarizationData.requesterInfo.phoneNumber)).toBeInTheDocument();
    expect(screen.getByText(mockNotarizationData.requesterInfo.email)).toBeInTheDocument();
  });

  test('displays correct notarization information', () => {
    render(<NotaryDocumentDetailsModal {...defaultProps} />);

    expect(screen.getByText(mockNotarizationData.notaryField.name)).toBeInTheDocument();
    expect(screen.getByText(mockNotarizationData.notaryService.name)).toBeInTheDocument();
  });

  test('handles file display correctly', () => {
    render(<NotaryDocumentDetailsModal {...defaultProps} />);

    expect(screen.getByText('test.pdf')).toBeInTheDocument();
    expect(screen.getByText('test.jpg')).toBeInTheDocument();
  });

  test('shows correct status', () => {
    render(<NotaryDocumentDetailsModal {...defaultProps} />);

    expect(screen.getAllByText('Chờ xử lý')[0]).toBeInTheDocument();
  });

  test('handles close button click', () => {
    render(<NotaryDocumentDetailsModal {...defaultProps} />);

    const closeButton = screen.getByTestId('ArrowBackIcon').closest('button');
    fireEvent.click(closeButton);

    expect(mockHandleClose).toHaveBeenCalled();
  });

  test('handles successful confirmation', async () => {
    NotarizationService.uploadNotarizationDocument.mockResolvedValueOnce({ success: true });

    render(
      <NotaryDocumentDetailsModal {...defaultProps} notarizationData={{ ...mockNotarizationData, status: undefined }} />,
    );

    const confirmButton = screen.getByText('Xác nhận');
    fireEvent.click(confirmButton);

    await waitFor(() => {
      expect(NotarizationService.uploadNotarizationDocument).toHaveBeenCalled();
    });
  });

  test('displays support information', () => {
    render(<NotaryDocumentDetailsModal {...defaultProps} />);

    expect(screen.getByText(/Hỗ trợ khách hàng/i)).toBeInTheDocument();
    expect(screen.getByText(/1900-123-456/)).toBeInTheDocument();
    expect(screen.getByText(/support@notary.vn/)).toBeInTheDocument();
  });
});
