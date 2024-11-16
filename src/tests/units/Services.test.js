import { render, screen, fireEvent, act } from '@testing-library/react';
import Services from '../../pages/services/Services';
import { services } from '../../utils/fakeData';

jest.useFakeTimers();

jest.useFakeTimers();

describe('Services Component', () => {
  it('renders Services component correctly', () => {
    render(<Services />);

    // Check if title is rendered
    expect(screen.getByText('Dịch vụ công chứng')).toBeInTheDocument();

    // Check if description is rendered
    expect(
      screen.getByText(/Dịch vụ công chứng của chúng tôi được thiết kế/)
    ).toBeInTheDocument();

    // Check if search input exists
    expect(screen.getByPlaceholderText('Tìm kiếm...')).toBeInTheDocument();
  });

  it('loads content after initial loading', () => {
    render(<Services />);

    // Fast-forward loading timer
    act(() => {
      jest.advanceTimersByTime(2000);
    });

    // Check if services are rendered
    services.forEach((service) => {
      expect(screen.getByText(service.title)).toBeInTheDocument();
      expect(screen.getByText(service.description)).toBeInTheDocument();
    });
  });

  it('handles search functionality', () => {
    render(<Services />);

    // Fast-forward initial loading
    act(() => {
      jest.advanceTimersByTime(2000);
    });

    const searchInput = screen.getByPlaceholderText('Tìm kiếm...');

    // Perform search
    fireEvent.change(searchInput, { target: { value: services[0].title } });

    // Fast-forward search loading
    act(() => {
      jest.advanceTimersByTime(2000);
    });
    // Check that other services are not displayed
    services.slice(1).forEach((service) => {
      expect(screen.queryByText(service.title)).not.toBeInTheDocument();
    });
  });
});