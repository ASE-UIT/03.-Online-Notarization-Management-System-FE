import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import NotarySessionForm from '../../../src/pages/services/NotarySessionForm'; // Adjust the path accordingly
import { toast } from 'react-toastify';

jest.mock('react-toastify', () => ({
  toast: {
    error: jest.fn(),
    success: jest.fn(),
  },
}));

describe('NotarySessionForm', () => {
  const defaultProps = {
    open: true,
    setOpen: jest.fn(),
    handleSuccess: jest.fn(),
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders the NotarySessionForm without crashing', () => {
    render(<NotarySessionForm {...defaultProps} />);
    expect(screen.getByText('Tạo Phiên Công Chứng')).toBeInTheDocument();
  });

  it('shows validation errors when required fields are missing', async () => {
    render(<NotarySessionForm {...defaultProps} />);

    const confirmButton = screen.getByText('Xác nhận');
    fireEvent.click(confirmButton);

    await waitFor(() => {
      expect(toast.error).toHaveBeenCalledWith('Vui lòng nhập đầy đủ thông tin.');
    });
  });
});
