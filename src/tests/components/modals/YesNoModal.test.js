import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import YesNoModal from '../../../components/modals/YesNoModal';

describe('YesNoModal', () => {
  const defaultProps = {
    title: 'Test Title',
    content: 'Test Content',
    open: true,
    setOpen: jest.fn(),
    onYes: jest.fn(),
    onNo: jest.fn(),
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('renders modal when open', () => {
    render(<YesNoModal {...defaultProps} />);

    expect(screen.getByText('Test Title')).toBeInTheDocument();
    expect(screen.getByText('Test Content')).toBeInTheDocument();
  });

  test('does not render when closed', () => {
    render(<YesNoModal {...defaultProps} open={false} />);

    expect(screen.queryByText('Test Title')).not.toBeInTheDocument();
  });

  test('handles Yes button click', () => {
    render(<YesNoModal {...defaultProps} />);

    const yesButton = screen.getByText('Có');
    fireEvent.click(yesButton);

    expect(defaultProps.onYes).toHaveBeenCalledTimes(1);
  });

  test('handles No button click', () => {
    render(<YesNoModal {...defaultProps} />);

    const noButton = screen.getByText('Không');
    fireEvent.click(noButton);

    expect(defaultProps.onNo).toHaveBeenCalledTimes(1);
  });

  test('closes modal on backdrop click', () => {
    render(<YesNoModal {...defaultProps} />);

    const backdrop = screen.getByRole('presentation').firstChild;
    fireEvent.click(backdrop);

    expect(defaultProps.setOpen).toHaveBeenCalledWith(false);
  });

  test('applies correct styles', () => {
    render(<YesNoModal {...defaultProps} />);

    const modal = screen.getByRole('presentation');
    const container = modal.querySelector('.MuiBox-root');

    expect(container).toHaveStyle({
      position: 'absolute',
      borderRadius: '8px',
      backgroundColor: '#ffffff',
    });
  });

  test('button text transforms correctly', () => {
    render(<YesNoModal {...defaultProps} />);

    const yesButton = screen.getByText('Có');
    const noButton = screen.getByText('Không');

    expect(yesButton).toHaveStyle({ textTransform: 'initial' });
    expect(noButton).toHaveStyle({ textTransform: 'initial' });
  });

  test('has correct aria labels', () => {
    render(<YesNoModal {...defaultProps} />);

    expect(screen.getByLabelText('Test Title')).toBeInTheDocument();
  });
});
