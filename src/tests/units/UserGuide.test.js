// src/tests/units/UserGuide.test.js

import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import UserGuide from '../../pages/static/UserGuide';
import '@testing-library/jest-dom';
import { BrowserRouter } from 'react-router-dom';

describe('Trang Hướng dẫn sử dụng', () => {
  beforeEach(() => {
    render(
      <BrowserRouter>
        <UserGuide />
      </BrowserRouter>
    );
  });

  test('1. Kiểm tra hiển thị tiêu đề và văn bản mô tả', () => {
    // Kiểm tra tiêu đề
    const title = screen.getByText('5 bước để sử dụng dịch vụ công chứng trực tuyến');
    expect(title).toBeInTheDocument();
    expect(title).toHaveStyle({ fontWeight: 700 });

    // Kiểm tra văn bản mô tả
    const description = screen.getByText(/Công chứng tài liệu trở nên dễ dàng hơn/i);
    expect(description).toBeInTheDocument();
  });

  test('2. Kiểm tra danh sách các bước hướng dẫn', () => {
    // Kiểm tra số lượng bước
    const steps = screen.getAllByTestId('step-card');
    expect(steps).toHaveLength(5);

    // Kiểm tra thông tin của từng bước
    const expectedStepTitles = [
      'Đăng ký tài khoản',
      'Xác minh danh tính',
      'Lựa chọn dịch vụ công chứng',
      'Cung cấp tài liệu cần công chứng',
      'Thanh toán và nhận tài liệu đã được công chứng'
    ];

    expectedStepTitles.forEach((title, index) => {
      const stepTitle = screen.getByText(title);
      expect(stepTitle).toBeInTheDocument();
      
      // Kiểm tra nút "Tìm hiểu thêm"
      const expandButton = screen.getAllByText('Tìm hiểu thêm')[index];
      expect(expandButton).toBeInTheDocument();
      
      // Kiểm tra chức năng mở rộng thông tin
      fireEvent.click(expandButton);
      const stepDescription = screen.getByTestId(`step-description-${index}`);
      expect(stepDescription).toBeVisible();
    });
  });

  test('3. Kiểm tra hình ảnh minh họa', () => {
    const expectedImages = [
      'howitworks-signup.png',
      'howitworks-identify.png',
      'howitworks-services.png',
      'howitworks-necessarydocs.png',
      'howitworks-finalstep.png'
    ];

    expectedImages.forEach((imageSrc, index) => {
      const image = screen.getByTestId(`step-image-${index}`);
      expect(image).toBeInTheDocument();
      expect(image).toHaveAttribute('src', expect.stringContaining(imageSrc));
      expect(image).toHaveAttribute('alt', expect.any(String));
    });
  });

  test('4. Kiểm tra liên kết và nút', () => {
    // Kiểm tra liên kết đăng ký
    const registerLink = screen.getByText('tại đây');
    expect(registerLink).toHaveAttribute('href', expect.stringContaining('github.com/sloweyyy'));
    expect(registerLink).toHaveAttribute('target', '_blank');

    // Kiểm tra nút tạo hồ sơ (nếu có)
    const createProfileButton = screen.queryByText('Tạo hồ sơ công chứng');
    if (createProfileButton) {
      expect(createProfileButton).toBeInTheDocument();
      expect(createProfileButton).toHaveAttribute('href', '/create-profile');
    }

    // Kiểm tra chức năng mở rộng/thu gọn của các bước
    const expandButtons = screen.getAllByText('Tìm hiểu thêm');
    expandButtons.forEach((button, index) => {
      fireEvent.click(button);
      const stepDescription = screen.getByTestId(`step-description-${index}`);
      expect(stepDescription).toBeVisible();

      // Kiểm tra thu gọn
      fireEvent.click(button);
      expect(stepDescription).not.toBeVisible();
    });
  });
});