import { render, screen, fireEvent } from '@testing-library/react';
import CreateNotaryProfile from '../../../pages/services/CreateNotarizationProfile';
import '@testing-library/jest-dom';
import { BrowserRouter } from 'react-router-dom';

// Mock các dịch vụ nếu cần
jest.mock('../../../services/notarization.service');

describe('Trang Tạo hồ sơ công chứng', () => {
  test('Hiển thị tiêu đề và mô tả', () => {
    render(
      <BrowserRouter>
        <CreateNotaryProfile />
      </BrowserRouter>
    );

    const title = screen.getByText('Tạo hồ sơ công chứng');
    expect(title).toBeInTheDocument();

    const description = screen.getByText(/Vui lòng điền đầy đủ thông tin để tạo hồ sơ công chứng/i);
    expect(description).toBeInTheDocument();
  });

  test('Trường "Lĩnh vực công chứng" hoạt động đúng', async () => {
    render(
      <BrowserRouter>
        <CreateNotaryProfile />
      </BrowserRouter>
    );

    const fieldInput = screen.getByLabelText('Lĩnh vực công chứng');
    fireEvent.mouseDown(fieldInput);
    // Giả lập các lựa chọn
    const option = await screen.findByText('Bất động sản');
    fireEvent.click(option);

    expect(fieldInput).toHaveValue('Bất động sản');
  });

  test('Trường "CMND/CCCD" chỉ nhận số', () => {
    render(
      <BrowserRouter>
        <CreateNotaryProfile />
      </BrowserRouter>
    );

    const idInput = screen.getByLabelText('CMND/CCCD');
    fireEvent.change(idInput, { target: { value: 'abc123' } });

    expect(idInput.value).toBe('123');
  });

  test('Trường "Email" nhận định dạng email hợp lệ', () => {
    render(
      <BrowserRouter>
        <CreateNotaryProfile />
      </BrowserRouter>
    );

    const emailInput = screen.getByLabelText('Email');
    fireEvent.change(emailInput, { target: { value: 'testemail' } });

    // Giả lập người dùng chuyển focus để trigger validation
    fireEvent.blur(emailInput);

    const errorMessage = screen.getByText(/Vui lòng nhập email hợp lệ/i);
    expect(errorMessage).toBeInTheDocument();
  });

  test('Khu vực tải lên tệp hoạt động đúng', () => {
    render(
      <BrowserRouter>
        <CreateNotaryProfile />
      </BrowserRouter>
    );

    const uploadZone = screen.getByTestId('upload-zone');
    expect(uploadZone).toBeInTheDocument();

    // Giả lập kéo thả tệp
    const file = new File(['dummy content'], 'test.pdf', { type: 'application/pdf' });
    fireEvent.drop(uploadZone, {
      dataTransfer: {
        files: [file],
      },
    });

    const uploadedFile = screen.getByText('test.pdf');
    expect(uploadedFile).toBeInTheDocument();
  });

  test('Nút "Tiếp tục" hoạt động và kiểm tra dữ liệu đầu vào', () => {
    render(
      <BrowserRouter>
        <CreateNotaryProfile />
      </BrowserRouter>
    );

    const continueButton = screen.getByText('Tiếp tục');
    fireEvent.click(continueButton);

    const errorMessage = screen.getByText(/Vui lòng điền đầy đủ thông tin/i);
    expect(errorMessage).toBeInTheDocument();
  });
});