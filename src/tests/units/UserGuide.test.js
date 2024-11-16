import React from 'react';
import { render, screen } from '@testing-library/react';
import UserGuide from '../../pages/static/UserGuide';

// Mock the child components
jest.mock('../../components/static/StepCard', () => {
  return function MockStepCard({ step }) {
    return <div data-testid="step-card">{step.title}</div>;
  };
});

jest.mock('../../components/static/VideoCard', () => {
  return function MockVideoCard() {
    return <div data-testid="video-card">Video Card</div>;
  };
});

jest.mock('../../components/static/FooterCard', () => {
  return function MockFooterCard() {
    return <div data-testid="footer-card">Footer Card</div>;
  };
});

describe('UserGuide Component', () => {
  it('renders main heading sections', () => {
    render(<UserGuide />);

    expect(screen.getByText('HƯỚNG DẪN')).toBeInTheDocument();
    expect(screen.getByText(/5 bước để sử dụng dịch vụ/i)).toBeInTheDocument();
    expect(
      screen.getByText(/Công chứng tài liệu trở nên dễ dàng hơn/i)
    ).toBeInTheDocument();
  });

  it('renders all steps', () => {
    render(<UserGuide />);

    const steps = [
      'Đăng ký tài khoản',
      'Xác minh danh tính', 
      'Lựa chọn dịch vụ công chứng',
      'Cung cấp tài liệu cần công chứng',
      'Thanh toán và nhận tài liệu đã được công chứng'
    ];

    steps.forEach(step => {
      expect(screen.getByText(step)).toBeInTheDocument();
    });
  });

  it('renders VideoCard component', () => {
    render(<UserGuide />);
    expect(screen.getByTestId('video-card')).toBeInTheDocument();
  });

  it('renders FooterCard component', () => {
    render(<UserGuide />);
    expect(screen.getByTestId('footer-card')).toBeInTheDocument();
  });
});