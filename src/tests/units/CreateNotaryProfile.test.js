import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import CreateNotarizationProfile from '../../../src/pages/services/CreateNotarizationProfile';
import NotarizationService from '../../../src/services/notarization.service';
import { toast } from 'react-toastify';

jest.mock('react-toastify', () => ({
  toast: {
    error: jest.fn(),
  },
  ToastContainer: jest.fn(),
}));

jest.mock('../../../src/services/notarization.service', () => ({
  getAllNotarizationField: jest.fn(),
  getNotarizationServiceByFieldId: jest.fn(),
}));

describe('CreateNotarizationProfile', () => {
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

  it('hiển thị tiêu đề và văn bản mô tả chính xác', () => {
    render(<CreateNotarizationProfile />);
    expect(screen.getByText('Tạo hồ sơ công chứng')).toBeInTheDocument();
    expect(screen.getByText(/Chú ý: Những mục đánh dấu/)).toBeInTheDocument();
  });

  it('cho phép chọn lĩnh vực và dịch vụ công chứng', async () => {
    render(<CreateNotarizationProfile />);
    
    const fieldAutocomplete = screen.getByPlaceholderText('Chọn lĩnh vực công chứng');
    fireEvent.click(fieldAutocomplete);
    
    await waitFor(() => {
      expect(NotarizationService.getAllNotarizationField).toHaveBeenCalled();
    });
  });

  it('kiểm tra nhập thông tin người yêu cầu hợp lệ', () => {
    render(<CreateNotarizationProfile />);
    
    const fullNameInput = screen.getByPlaceholderText('Nhập họ và tên');
    const phoneInput = screen.getByPlaceholderText('Nhập số điện thoại');
    const citizenIdInput = screen.getByPlaceholderText('Nhập số CMND/CCCD/Hộ chiếu');
    const emailInput = screen.getByPlaceholderText('Nhập địa chỉ email');

    fireEvent.change(fullNameInput, { target: { value: 'Nguyễn Văn A' } });
    fireEvent.change(phoneInput, { target: { value: '0123456789' } });
    fireEvent.change(citizenIdInput, { target: { value: '123456789' } });
    fireEvent.change(emailInput, { target: { value: 'test@example.com' } });

    expect(fullNameInput.value).toBe('Nguyễn Văn A');
    expect(phoneInput.value).toBe('0123456789');
    expect(citizenIdInput.value).toBe('123456789');
    expect(emailInput.value).toBe('test@example.com');
  });

  it('hiển thị lỗi khi bấm Tiếp tục mà chưa điền đủ thông tin', async () => {
    render(<CreateNotarizationProfile />);
    
    const continueButton = screen.getByText('Tiếp tục');
    fireEvent.click(continueButton);

    await waitFor(() => {
      expect(toast.error).toHaveBeenCalledWith('Vui lòng điền đầy đủ thông tin người yêu cầu công chứng.');
    });
  });

  it('cho phép tải lên tệp với định dạng hợp lệ', () => {
    render(<CreateNotarizationProfile />);
    
    const file = new File(['dummy content'], 'test.pdf', { type: 'application/pdf' });
    const fileInput = screen.getByLabelText('', { selector: 'input[type="file"]' });
    
    fireEvent.change(fileInput, { target: { files: [file] } });
    
    expect(screen.getByText('test.pdf')).toBeInTheDocument();
  });

  it('hiển thị lỗi khi tải lên tệp không hợp lệ', () => {
    render(<CreateNotarizationProfile />);
    
    const file = new File(['dummy content'], 'test.exe', { type: 'application/x-msdownload' });
    const fileInput = screen.getByLabelText('', { selector: 'input[type="file"]' });
    
    fireEvent.change(fileInput, { target: { files: [file] } });
    
    expect(toast.error).toHaveBeenCalledWith('test.exe: Tài liệu được tải lên không có định dạng hợp lệ');
  });
});