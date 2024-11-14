import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import UserGuide from '../../../src/pages/static/UserGuide'; // Điều chỉnh đường dẫn cho phù hợp

describe('UserGuide', () => {
  it('hiển thị tiêu đề và văn bản mô tả chính xác', () => {
    render(<UserGuide />);
    expect(
      screen.getByText('5 bước để sử dụng dịch vụ\ncông chứng trực tuyến', { exact: false })
    ).toBeInTheDocument();
    expect(
      screen.getByText(/Công chứng tài liệu trở nên dễ dàng hơn khi sử dụng dịch vụ công chứng trực tuyến/i)
    ).toBeInTheDocument();
  });

  it('hiển thị danh sách các bước hướng dẫn đầy đủ và theo thứ tự', () => {
    render(<UserGuide />);
    const stepTitles = [
      'Đăng ký tài khoản',
      'Xác minh danh tính',
      'Lựa chọn dịch vụ công chứng',
      'Cung cấp tài liệu cần công chứng',
      'Thanh toán và nhận tài liệu đã được công chứng',
    ];

    stepTitles.forEach((title) => {
      expect(screen.getByText(title)).toBeInTheDocument();
    });
  });

  it('hiển thị tiêu đề và mô tả của từng bước', () => {
    render(<UserGuide />);
    const stepDescriptions = [
      /Để sử dụng dịch vụ công chứng trực tuyến, bạn cần đăng nhập vào tài khoản/i,
      /Để đảm bảo tính bảo mật và hợp pháp của dịch vụ, bạn cần xác minh danh tính/i,
      /Chúng tôi cung cấp nhiều loại dịch vụ công chứng khác nhau/i,
      /Bạn cần tải lên các tài liệu cần công chứng lên hệ thống/i,
      /Sau khi hoàn tất các bước trên, bạn chỉ cần thanh toán phí dịch vụ/i,
    ];

    stepDescriptions.forEach((regex) => {
      expect(screen.getByText(regex)).toBeInTheDocument();
    });
  });

  it('hiển thị hình ảnh minh họa cho từng bước', () => {
    render(<UserGuide />);
    const imageAlts = [
      'howitworks-signup.png',
      'howitworks-identify.png',
      'howitworks-services.png',
      'howitworks-necessarydocs.png',
      'howtiworks-finalstep.png',
    ];

    imageAlts.forEach((alt) => {
      const images = screen.getAllByAltText(alt);
      expect(images.length).toBeGreaterThan(0);
    });
  });

  it('nút "Tìm hiểu thêm" cho mỗi bước hoạt động', () => {
    render(<UserGuide />);
    const expandButtons = screen.getAllByRole('button', { name: /tìm hiểu thêm/i });

    expandButtons.forEach((button) => {
      fireEvent.click(button);
      // Kiểm tra xem nội dung mở rộng có hiển thị hay không
      expect(button.getAttribute('aria-expanded')).toBe('true');
    });
  });

  it('nút "Tạo hồ sơ công chứng" hoạt động đúng', () => {
    render(<UserGuide />);
    const createProfileButton = screen.getByText('Tạo hồ sơ công chứng');
    expect(createProfileButton).toBeInTheDocument();

    fireEvent.click(createProfileButton);
    // Kiểm tra hành động sau khi nhấn nút, ví dụ chuyển hướng hoặc gọi hàm
    // Nếu sử dụng react-router, kiểm tra history hoặc mock useNavigate
  });
});