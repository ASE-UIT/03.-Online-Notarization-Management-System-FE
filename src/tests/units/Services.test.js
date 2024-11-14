import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import Services from '../../../src/pages/services/Services'; // Điều chỉnh đường dẫn cho phù hợp
import { services } from '../../../src/utils/fakeData'; // Điều chỉnh đường dẫn cho phù hợp

describe('Services', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    });
  });

  it('hiển thị tiêu đề và văn bản mô tả', () => {
    render(<Services />);
    expect(screen.getByText('Dịch vụ công chứng')).toBeInTheDocument();
    expect(
      screen.getByText(/Dịch vụ công chứng của chúng tôi được thiết kế để mang lại sự tiện lợi/i)
    ).toBeInTheDocument();
  });

  it('cho phép người dùng nhập từ khóa vào ô tìm kiếm và hiển thị kết quả đúng', async () => {
    render(<Services />);
    const searchInput = screen.getByPlaceholderText('Tìm kiếm...');
    fireEvent.change(searchInput, { target: { value: services[0].title } });

    await waitFor(() => {
      expect(screen.getByText(services[0].title)).toBeInTheDocument();
    });
  });

  it('hiển thị danh sách dịch vụ đầy đủ với tiêu đề, mô tả và nút "Tạo hồ sơ"', () => {
    render(<Services />);
    services.forEach((service) => {
      expect(screen.getByText(service.title)).toBeInTheDocument();
      expect(screen.getByText(service.description)).toBeInTheDocument();
    });
    const createProfileButtons = screen.getAllByText('Tạo hồ sơ');
    expect(createProfileButtons.length).toBe(services.length);
  });

  it('chuyển hướng đến trang tạo hồ sơ khi nhấn nút "Tạo hồ sơ"', () => {
    render(<Services />);
    const createProfileLink = screen.getAllByText('Tạo hồ sơ')[0];
    fireEvent.click(createProfileLink);
    // Kiểm tra chuyển hướng hoặc hành động tương ứng sau khi nhấn nút
  });

  it('hiển thị hướng dẫn quy trình đúng và đầy đủ', () => {
    render(<Services />);
    // Kiểm tra nội dung của component Guide
    expect(screen.getByText('Hướng dẫn quy trình')).toBeInTheDocument();
  });
  it('chuyển hướng đến trang tạo hồ sơ khi nhấn nút "Tạo hồ sơ"', () => {
    render(<Services />);
    const createProfileButtons = screen.getAllByText('Tạo hồ sơ');
    
    createProfileButtons.forEach((button) => {
      fireEvent.click(button);
      // Kiểm tra hành động chuyển hướng hoặc gọi hàm tương ứng

    });
  });
  
  it('hiển thị hướng dẫn quy trình đúng và cho phép người dùng điều hướng giữa các bước', () => {
    render(<Services />);
    expect(screen.getByText('Hướng dẫn quy trình')).toBeInTheDocument();
    // Kiểm tra các bước trong hướng dẫn quy trình
    expect(screen.getByText('Bước 1')).toBeInTheDocument();
    expect(screen.getByText('Bước 2')).toBeInTheDocument();
    // Kiểm tra khả năng chuyển đổi giữa các bước nếu có
  });
  
  it('hiển thị phần liên hệ và cho phép người dùng điền thông tin liên hệ', async () => {
    render(<Services />);
    const lastNameInput = screen.getByLabelText('Họ');
    const firstNameInput = screen.getByLabelText('Tên');
    const emailInput = screen.getByLabelText('Email');
    const phoneInput = screen.getByLabelText('Số điện thoại');
    const messageInput = screen.getByLabelText('Tin nhắn');
    const sendButton = screen.getByText('Gửi tin nhắn');
  
    fireEvent.change(lastNameInput, { target: { value: 'Nguyễn' } });
    fireEvent.change(firstNameInput, { target: { value: 'Văn A' } });
    fireEvent.change(emailInput, { target: { value: 'test@example.com' } });
    fireEvent.change(phoneInput, { target: { value: '0123456789' } });
    fireEvent.change(messageInput, { target: { value: 'Xin chào' } });
  
    fireEvent.click(sendButton);
  
    await waitFor(() => {
      // Kiểm tra thông báo xác nhận sau khi gửi
      expect(screen.getByText('Gửi tin nhắn thành công')).toBeInTheDocument();
    });
  });
  
  it('hiển thị lỗi khi các trường thông tin liên hệ không hợp lệ', async () => {
    render(<Services />);
    const emailInput = screen.getByLabelText('Email');
    const phoneInput = screen.getByLabelText('Số điện thoại');
    const sendButton = screen.getByText('Gửi tin nhắn');
  
    fireEvent.change(emailInput, { target: { value: 'email_sai_dinh_dang' } });
    fireEvent.change(phoneInput, { target: { value: 'abcxyz' } });
    fireEvent.click(sendButton);
  
    await waitFor(() => {
      // Kiểm tra thông báo lỗi email
      expect(screen.getByText('Email không hợp lệ')).toBeInTheDocument();
      // Kiểm tra thông báo lỗi số điện thoại
      expect(screen.getByText('Số điện thoại không hợp lệ')).toBeInTheDocument();
    });
});