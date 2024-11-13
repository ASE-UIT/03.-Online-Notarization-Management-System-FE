import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import NotaryDocumentDetailsModal from '../../../src/components/modals/NotaryDocumentDetailsModal';
import React from 'react';

jest.mock('../../../src/services/notarization.service', () => ({
  uploadNotarizationDocument: jest.fn().mockResolvedValue({ success: true }),
}));

jest.mock('../../../src/components/modals/NotaryStep', () => () => <div>Mocked NotaryStep</div>);

describe('NotaryDocumentDetailsModal Component', () => {
  const mockHandleClose = jest.fn();
  const mockNotarizationData = {
    _id: '12345',
    notaryService: { name: 'Dịch vụ công chứng ABC' },
    notaryField: { name: 'Lĩnh vực pháp lý' },
    requesterInfo: {
      fullName: 'Nguyễn Văn A',
      citizenId: '0123456789',
      phoneNumber: '0987654321',
      email: 'nguyenvana@example.com',
    },
    files: [
      { name: 'file1.pdf', size: '1MB' },
      { name: 'file2.pdf', size: '2MB' },
    ],
    status: 'pending',
  };

  test('renders modal with correct data', () => {
    render(<NotaryDocumentDetailsModal open={true} handleClose={mockHandleClose} notarizationData={mockNotarizationData} />);

    // Kiểm tra tiêu đề modal
    expect(screen.getByText('Chi tiết hồ sơ công chứng - Mã số: #12345')).toBeInTheDocument();

    // Kiểm tra thông tin khách hàng
    expect(screen.getByText('Họ và tên:')).toBeInTheDocument();
    expect(screen.getByText('Nguyễn Văn A')).toBeInTheDocument();

    // Kiểm tra thông tin tệp
    expect(screen.getByText('file1.pdf')).toBeInTheDocument();
    expect(screen.getByText('file2.pdf')).toBeInTheDocument();

    // Kiểm tra trạng thái
    expect(screen.getByText('Chờ xử lý')).toBeInTheDocument();
  });

  test('calls handleClose when close button is clicked', () => {
    render(<NotaryDocumentDetailsModal open={true} handleClose={mockHandleClose} notarizationData={mockNotarizationData} />);

    // Click nút đóng
    fireEvent.click(screen.getByLabelText('Arrow Back'));
    expect(mockHandleClose).toHaveBeenCalledTimes(1);
  });

  test('renders "Xác nhận" button and calls handleConfirm when clicked', async () => {
    render(
      <NotaryDocumentDetailsModal
        open={true}
        handleClose={mockHandleClose}
        notarizationData={{ ...mockNotarizationData, status: undefined }}
      />,
    );

    // Kiểm tra nút "Xác nhận"
    const confirmButton = screen.getByRole('button', { name: 'Xác nhận' });
    expect(confirmButton).toBeInTheDocument();

    // Click nút xác nhận
    fireEvent.click(confirmButton);

    const mockUploadService = require('../../../src/services/notarization.service').uploadNotarizationDocument;
    expect(mockUploadService).toHaveBeenCalledTimes(1);
    expect(mockUploadService).toHaveBeenCalledWith(expect.any(FormData));
  });

  test('renders file details correctly', () => {
    render(<NotaryDocumentDetailsModal open={true} handleClose={mockHandleClose} notarizationData={mockNotarizationData} />);

    // Kiểm tra tên và kích thước file
    expect(screen.getByText('file1.pdf')).toBeInTheDocument();
    expect(screen.getByText('1MB')).toBeInTheDocument();
    expect(screen.getByText('file2.pdf')).toBeInTheDocument();
    expect(screen.getByText('2MB')).toBeInTheDocument();
  });

  test('renders status boxes correctly', () => {
    const statuses = [
      { status: undefined, text: 'Chưa xác nhận' },
      { status: 'pending', text: 'Chờ xử lý' },
      { status: 'processing', text: 'Đang xử lý' },
      { status: 'receiving', text: 'Tiếp nhận và sử lý' },
      { status: 'ready', text: 'Sẵn sàng ký số' },
      { status: 'completed', text: 'Hoàn tất' },
    ];

    statuses.forEach(({ status, text }) => {
      render(
        <NotaryDocumentDetailsModal
          open={true}
          handleClose={mockHandleClose}
          notarizationData={{ ...mockNotarizationData, status }}
        />,
      );
      expect(screen.getByText(text)).toBeInTheDocument();
    });
  });

  test('does not render modal when "open" prop is false', () => {
    render(
      <NotaryDocumentDetailsModal open={false} handleClose={mockHandleClose} notarizationData={mockNotarizationData} />,
    );

    // Modal không hiển thị
    expect(screen.queryByText('Chi tiết hồ sơ công chứng')).not.toBeInTheDocument();
  });
});
