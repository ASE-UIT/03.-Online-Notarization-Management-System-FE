import { render, screen, fireEvent } from '@testing-library/react';
import Services from '../../../pages/services/Services';
import '@testing-library/jest-dom';
import { BrowserRouter } from 'react-router-dom';

// Mock dữ liệu dịch vụ
const mockServices = [
  {
    id: 1,
    title: 'Dịch vụ công chứng A',
    description: 'Mô tả dịch vụ A',
    link: '/create-profile/1'
  },
  {
    id: 2,
    title: 'Dịch vụ công chứng B',
    description: 'Mô tả dịch vụ B',
    link: '/create-profile/2'
  }
];

// Mock API
jest.mock('../../../services/service.service', () => ({
  getServices: jest.fn(() => Promise.resolve({ data: mockServices }))
}));

describe('Trang Dịch vụ', () => {
  test('Hiển thị tiêu đề và văn bản mô tả', () => {
    render(
      <BrowserRouter>
        <Services />
      </BrowserRouter>
    );
    const titleText = screen.getByText(/Dịch vụ công chứng của chúng tôi/);
    expect(titleText).toBeInTheDocument();

    const descriptionText = screen.getByText(/được thiết kế để mang lại sự tiện lợi và an toàn cho các giao dịch của bạn/i);
    expect(descriptionText).toBeInTheDocument();
  });

  test('Chức năng tìm kiếm hoạt động chính xác', async () => {
    render(
      <BrowserRouter>
        <Services />
      </BrowserRouter>
    );
    const searchInput = screen.getByPlaceholderText('Tìm kiếm...');
    fireEvent.change(searchInput, { target: { value: 'Dịch vụ công chứng A' } });

    const serviceTitle = await screen.findByText('Dịch vụ công chứng A');
    expect(serviceTitle).toBeInTheDocument();

    const hiddenServiceTitle = screen.queryByText('Dịch vụ công chứng B');
    expect(hiddenServiceTitle).not.toBeInTheDocument();
  });

  test('Hiển thị danh sách dịch vụ đầy đủ', async () => {
    render(
      <BrowserRouter>
        <Services />
      </BrowserRouter>
    );
    const serviceTitles = await screen.findAllByTestId('service-title');
    expect(serviceTitles.length).toBe(mockServices.length);
  });

  test('Các mục dịch vụ hiển thị đầy đủ thông tin', async () => {
    render(
      <BrowserRouter>
        <Services />
      </BrowserRouter>
    );
    const serviceItems = await screen.findAllByTestId('service-item');
    serviceItems.forEach((item) => {
      expect(item.querySelector('.service-title')).toBeInTheDocument();
      expect(item.querySelector('.service-description')).toBeInTheDocument();
      expect(item.querySelector('.create-profile-button')).toBeInTheDocument();
    });
  });

  test('Nút "Tạo hồ sơ" chuyển hướng đúng', async () => {
    render(
      <BrowserRouter>
        <Services />
      </BrowserRouter>
    );
    const createButtons = await screen.findAllByText('Tạo hồ sơ');
    expect(createButtons.length).toBeGreaterThan(0);

    fireEvent.click(createButtons[0]);
    expect(window.location.pathname).toBe('/create-profile/1');
  });
});