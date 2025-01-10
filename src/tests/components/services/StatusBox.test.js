import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import StatusBox from '../../../components/services/StatusBox';

describe('StatusBox', () => {
  const mockOnOpenModal = jest.fn();

  const mockStatuses = {
    notFound: {
      notFound: true,
      searching: false,
      found: false,
    },
    searching: {
      notFound: false,
      searching: true,
      found: false,
    },
    found: {
      notFound: false,
      searching: false,
      found: true,
    },
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('renders with not found status', () => {
    render(<StatusBox status={mockStatuses.notFound} displayText="ABC123" onOpenModal={mockOnOpenModal} />);

    expect(screen.getByTestId('ErrorIcon')).toBeInTheDocument();
    expect(screen.getByText(/Không tìm thấy hồ sơ/)).toBeInTheDocument();
    expect(screen.getByText('ABC123')).toBeInTheDocument();
    expect(screen.queryByText('Xem chi tiết')).not.toBeInTheDocument();
  });

  test('renders with searching status', () => {
    render(<StatusBox status={mockStatuses.searching} displayText="ABC123" onOpenModal={mockOnOpenModal} />);

    expect(screen.getByRole('progressbar')).toBeInTheDocument();
    expect(screen.getByText(/Đang tìm hồ sơ/)).toBeInTheDocument();
    expect(screen.queryByText('Xem chi tiết')).not.toBeInTheDocument();
  });

  test('renders with found status', () => {
    render(<StatusBox status={mockStatuses.found} displayText="ABC123" onOpenModal={mockOnOpenModal} />);

    expect(screen.getByTestId('CheckCircleIcon')).toBeInTheDocument();
    expect(screen.getByText(/Đã tìm thấy hồ sơ/)).toBeInTheDocument();
    expect(screen.getByText('Xem chi tiết')).toBeInTheDocument();
  });

  test('calls onOpenModal when detail link is clicked', () => {
    render(<StatusBox status={mockStatuses.found} displayText="ABC123" onOpenModal={mockOnOpenModal} />);

    const detailLink = screen.getByText('Xem chi tiết');
    fireEvent.click(detailLink);
    expect(mockOnOpenModal).toHaveBeenCalledTimes(1);
  });

  test('renders in a box container', () => {
    const { container } = render(
      <StatusBox status={mockStatuses.found} displayText="ABC123" onOpenModal={mockOnOpenModal} />,
    );

    const boxElement = container.querySelector('.MuiBox-root');
    expect(boxElement).toBeInTheDocument();
    expect(boxElement).toHaveStyle({
      display: 'flex',
      alignItems: 'center',
    });
  });

  test('applies responsive styles', () => {
    render(<StatusBox status={mockStatuses.found} displayText="ABC123" onOpenModal={mockOnOpenModal} />);

    const detailLink = screen.getByText('Xem chi tiết');
    expect(detailLink).toHaveStyle({
      fontSize: '14px',
      whiteSpace: 'nowrap',
    });
  });
});
