import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import Services from '../../pages/services/Services';
import { services } from '../../utils/fakeData';
import '@testing-library/jest-dom/extend-expect';

// Mock the Guide component since its implementation is not the focus of these tests
jest.mock('../../components/services/Guide', () => () => <div data-testid="guide-component">Guide Component</div>);

describe('Services Component', () => {
  beforeEach(() => {
    jest.useFakeTimers(); // Use fake timers to control setTimeout
  });

  afterEach(() => {
    jest.runOnlyPendingTimers(); // Run any pending timers
    jest.useRealTimers(); // Restore real timers after each test
  });

  test('1. Kiểm tra hiển thị tiêu đề và văn bản mô tả', () => {
    render(<Services />);

    // Fast-forward until all timers have been executed
    jest.runAllTimers();

    // Kiểm tra tiêu đề
    const title = screen.getByText('Dịch vụ công chứng');
    expect(title).toBeInTheDocument();

    // Kiểm tra văn bản mô tả
    const descriptionTextStart = 'Dịch vụ công chứng của chúng tôi được thiết kế để mang lại sự tiện';
    const description = screen.getByText((content, element) => {
      return element.textContent.startsWith(descriptionTextStart);
    });
    expect(description).toBeInTheDocument();
  });

  test('2. Kiểm tra ô tìm kiếm dịch vụ cho phép nhập liệu', () => {
    render(<Services />);

    // Fast-forward until all timers have been executed
    jest.runAllTimers();

    // Kiểm tra ô tìm kiếm
    const searchInput = screen.getByPlaceholderText('Tìm kiếm...');
    expect(searchInput).toBeInTheDocument();

    // Kiểm tra người dùng có thể nhập từ khóa
    fireEvent.change(searchInput, { target: { value: 'Dịch vụ A' } });
    expect(searchInput.value).toBe('Dịch vụ A');
  });

  test('2. Kiểm tra chức năng tìm kiếm hiển thị kết quả đúng', async () => {
    render(<Services />);

    jest.runAllTimers(); // Bỏ qua trạng thái loading ban đầu

    const searchInput = screen.getByPlaceholderText('Tìm kiếm...');

    // Nhập từ khóa vào ô tìm kiếm
    fireEvent.change(searchInput, { target: { value: 'Dịch vụ A' } });

    // Advance timers to simulate the search delay
    jest.advanceTimersByTime(2000);

    // Wait for the search results to update
    await waitFor(() => {
      // Kiểm tra kết quả tìm kiếm
      const serviceTitle = screen.getByText('Dịch vụ A');
      expect(serviceTitle).toBeInTheDocument();
    });

    // Kiểm tra rằng các dịch vụ không liên quan không được hiển thị
    const unrelatedService = screen.queryByText('Dịch vụ B');
    expect(unrelatedService).not.toBeInTheDocument();
  });

  test('2. Kiểm tra danh sách dịch vụ hiển thị đầy đủ', () => {
    render(<Services />);

    jest.runAllTimers(); // Bỏ qua trạng thái loading ban đầu

    services.forEach((service) => {
      // Kiểm tra tiêu đề dịch vụ
      const serviceTitle = screen.getByText(service.title);
      expect(serviceTitle).toBeInTheDocument();

      // Kiểm tra mô tả dịch vụ
      const serviceDescription = screen.getByText(service.description);
      expect(serviceDescription).toBeInTheDocument();

      // Kiểm tra nút "Tạo hồ sơ"
      const createProfileLink = screen.getByText('Tạo hồ sơ', { selector: 'a' });
      expect(createProfileLink).toBeInTheDocument();
    });
  });

  test('3. Kiểm tra nút "Tạo hồ sơ" chuyển hướng đúng', () => {
    render(<Services />);

    jest.runAllTimers(); // Bỏ qua trạng thái loading ban đầu

    const createProfileLinks = screen.getAllByText('Tạo hồ sơ', { selector: 'a' });
    expect(createProfileLinks.length).toBeGreaterThan(0);

    // Kiểm tra href của mỗi link
    createProfileLinks.forEach((link, index) => {
      expect(link).toHaveAttribute('href', services[index].href);
    });
  });

  test('4. Kiểm tra hiển thị component Guide', () => {
    render(<Services />);

    jest.runAllTimers(); // Bỏ qua trạng thái loading ban đầu

    const guideComponent = screen.getByTestId('guide-component');
    expect(guideComponent).toBeInTheDocument();
  });
});
