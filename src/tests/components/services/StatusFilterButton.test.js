import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import StatusFilterButton from '../../../components/services/StatusFilterButton';
import { PendingRounded, CheckCircleRounded } from '@mui/icons-material';

describe('StatusFilterButton', () => {
  const mockProps = {
    statusFilter: 'Pending',
    handleFilterByStatus: jest.fn(),
    clickedButton: '',
    iconMap: {
      Pending: <PendingRounded />,
      Completed: <CheckCircleRounded />,
    },
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('renders with correct text', () => {
    render(<StatusFilterButton {...mockProps} />);
    expect(screen.getByText('Pending')).toBeInTheDocument();
  });

  test('renders with icon when provided', () => {
    render(<StatusFilterButton {...mockProps} />);
    expect(screen.getByTestId('PendingRoundedIcon')).toBeInTheDocument();
  });

  test('applies active styles when clicked', () => {
    const clickedProps = {
      ...mockProps,
      clickedButton: 'Pending',
    };

    const { container } = render(<StatusFilterButton {...clickedProps} />);
    const button = container.querySelector('button');

    expect(button).toHaveStyle({
      color: 'rgb(0, 0, 0)',
      borderBottom: '1px solid #000',
    });
  });

  test('applies inactive styles when not clicked', () => {
    const { container } = render(<StatusFilterButton {...mockProps} />);
    const button = container.querySelector('button');

    expect(button).toHaveStyle({
      color: 'rgb(158, 158, 158)',
      borderBottom: 'none',
    });
  });

  test('calls handleFilterByStatus when clicked', () => {
    render(<StatusFilterButton {...mockProps} />);
    const button = screen.getByRole('button');

    fireEvent.click(button);
    expect(mockProps.handleFilterByStatus).toHaveBeenCalledWith('Pending');
  });

  test('renders without icon when status not in iconMap', () => {
    const propsWithoutIcon = {
      ...mockProps,
      statusFilter: 'Unknown',
    };

    render(<StatusFilterButton {...propsWithoutIcon} />);
    const icons = screen.queryByTestId(/.*Icon$/);
    expect(icons).not.toBeInTheDocument();
  });

  test('applies consistent button styles', () => {
    const { container } = render(<StatusFilterButton {...mockProps} />);
    const button = container.querySelector('button');

    expect(button).toHaveStyle({
      fontSize: '12px',
      fontWeight: '500',
      lineHeight: '12px',
      textTransform: 'none',
      borderRadius: '0px',
      padding: '4px 8px',
    });
  });
});
