import React from 'react';
import { render, screen } from '@testing-library/react';
import Services from '../../pages/services/Services';

describe('Kiểm tra hiển thị các tiêu đề và văn bản', () => {
  test('Hiển thị tiêu đề dịch vụ công chứng', () => {
    render(<Services />);
    const titleElement = screen.getByText(/Dịch vụ công chứng/i);
    expect(titleElement).toBeInTheDocument();
  });

  test('Hiển thị văn bản mô tả đầy đủ', () => {
    render(<Services />);
    const descriptionText = screen.getByText(/Dịch vụ công chứng của chúng tôi được thiết kế để mang lại sự tiện lợi/i);
    expect(descriptionText).toBeInTheDocument();
  });
});
