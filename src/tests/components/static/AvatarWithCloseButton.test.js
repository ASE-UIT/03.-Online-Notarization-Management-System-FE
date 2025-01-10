import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import AvatarWithCloseButton from '../../../components/static/AvatarWithCloseButton';

describe('AvatarWithCloseButton Component', () => {
  const defaultProps = {
    email: 'test@example.com',
    onRemove: jest.fn(),
    name: 'Test User',
    isCreator: false,
    onHideRemoveIcon: false,
  };

  const renderComponent = (props = {}) => {
    return render(<AvatarWithCloseButton {...defaultProps} {...props} />);
  };

  describe('Initial Render', () => {
    it('renders avatar with correct email initial', () => {
      renderComponent();
      expect(screen.getByText('T')).toBeInTheDocument();
    });

    it('renders close button when onHideRemoveIcon is false', () => {
      renderComponent();
      expect(screen.getByTestId('CloseIcon')).toBeInTheDocument();
    });

    it('hides close button when onHideRemoveIcon is true', () => {
      renderComponent({ onHideRemoveIcon: true });
      expect(screen.queryByTestId('CloseIcon')).not.toBeInTheDocument();
    });
  });

  describe('Hover Interactions', () => {
    it('shows email on hover', () => {
      renderComponent();
      const container = screen.getByText('T').closest('div');

      fireEvent.mouseEnter(container);
      expect(screen.getByText('test@example.com')).toBeVisible();
    });

    it('shows name on hover', () => {
      renderComponent();
      const container = screen.getByText('T').closest('div');

      fireEvent.mouseEnter(container);
      expect(screen.getByText('Test User')).toBeVisible();
    });

    it('shows correct role text for guest', () => {
      renderComponent({ isCreator: false });
      const container = screen.getByText('T').closest('div');

      fireEvent.mouseEnter(container);
      expect(screen.getByText('Khách mời')).toBeVisible();
    });

    it('shows correct role text for creator', () => {
      renderComponent({ isCreator: true });
      const container = screen.getByText('T').closest('div');

      fireEvent.mouseEnter(container);
      expect(screen.getByText('Chủ phiên')).toBeVisible();
    });
  });

  describe('Close Button Functionality', () => {
    it('calls onRemove when close button is clicked', () => {
      const onRemove = jest.fn();
      renderComponent({ onRemove });

      const closeButton = screen.getByTestId('CloseIcon').closest('button');
      fireEvent.click(closeButton);

      expect(onRemove).toHaveBeenCalledTimes(1);
    });
  });

  describe('Mouse Leave Behavior', () => {
    it('hides email and name on mouse leave', () => {
      renderComponent();
      const container = screen.getByText('T').closest('div');

      // Show content
      fireEvent.mouseEnter(container);
      expect(screen.getByText('test@example.com')).toBeVisible();

      // Hide content
      fireEvent.mouseLeave(container);
      expect(screen.getByText('test@example.com')).not.toBeVisible();
    });
  });
});
