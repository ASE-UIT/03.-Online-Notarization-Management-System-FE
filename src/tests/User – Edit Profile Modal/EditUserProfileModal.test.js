import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import EditUserProfileModal from '../../../src/components/modals/EditUserProfileModal';

describe('EditUserProfileModal', () => {
  it('should render the modal', () => {
    render(<EditUserProfileModal open={true} handleClose={jest.fn()} />);
    expect(screen.getByText('Cập nhật hồ sơ')).toBeInTheDocument();
  });

  it('should call handleClose when close button is clicked', () => {
    const mockHandleClose = jest.fn();
    render(<EditUserProfileModal open={true} handleClose={mockHandleClose} />);
    fireEvent.click(screen.getByRole('button')); // Assuming button is used for close
    expect(mockHandleClose).toHaveBeenCalled();
  });
});
