import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import CreateNotarizationProfile from '../../pages/services/CreateNotarizationProfile';
import NotarizationService from '../../services/notarization.service';

// Mock the dependencies
jest.mock('react-toastify', () => ({
  toast: {
    error: jest.fn(),
  },
  ToastContainer: jest.fn(),
}));

// Mock NotarizationService
jest.mock('../../services/notarization.service', () => ({
  getAllNotarizationField: jest.fn(),
  getNotarizationServiceByFieldId: jest.fn(),
}));

// Mock uploaded file list component
jest.mock('../../components/services/UploadedFileList', () => {
  return function MockUploadedFileList() {
    return <div data-testid="uploaded-file-list">Uploaded Files</div>;
  };
});

// Mock modal component
jest.mock('../../components/modals/NotaryDocumentDetailsModal', () => {
  return function MockModal() {
    return <div data-testid="notary-document-modal">Modal Content</div>;
  };
});

describe('CreateNotarizationProfile Component', () => {
  const mockNotarizationFields = [
    { id: 1, name: 'Hợp đồng' },
    { id: 2, name: 'Di chúc' }
  ];

  const mockNotarizationServices = [
    { id: 1, name: 'Công chứng hợp đồng mua bán' },
    { id: 2, name: 'Công chứng di chúc' }
  ];

  beforeEach(() => {
    jest.clearAllMocks();
    NotarizationService.getAllNotarizationField.mockResolvedValue(mockNotarizationFields);
    NotarizationService.getNotarizationServiceByFieldId.mockResolvedValue(mockNotarizationServices);
  });

  it('renders main heading sections', () => {
    render(<CreateNotarizationProfile />);

    expect(screen.getByText('Tạo hồ sơ công chứng')).toBeInTheDocument();
    expect(screen.getByText(/Chú ý: Những mục đánh dấu/)).toBeInTheDocument();
  });

  it('renders form inputs', () => {
    render(<CreateNotarizationProfile />);

    expect(screen.getByPlaceholderText('Chọn lĩnh vực công chứng')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Chọn dịch vụ công chứng')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Nhập họ và tên')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Nhập số điện thoại')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Nhập số CMND/CCCD/Hộ chiếu')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Nhập địa chỉ email')).toBeInTheDocument();
  });

  it('renders file upload section', () => {
    render(<CreateNotarizationProfile />);

    expect(screen.getByText('Kéo thả hoặc nhấn vào đây để thêm tài liệu')).toBeInTheDocument();
    expect(screen.getByText('Tài liệu phải có định dạng .pdf, .docx, .png hoặc .jpg')).toBeInTheDocument();
  });
});