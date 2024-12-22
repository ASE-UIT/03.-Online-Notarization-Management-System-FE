import React from 'react';
import { render, screen, fireEvent, act } from '@testing-library/react';
import '@testing-library/jest-dom';
import Header from '../components/Header';
import { useMediaQuery } from '@mui/material';

// Mock useMediaQuery
jest.mock('@mui/material', () => ({
  ...jest.requireActual('@mui/material'),
  useMediaQuery: jest.fn(),
}));

// Mock image
jest.mock('../assets/images/ASE.png', () => 'mocked-logo-path');

describe('Header Component', () => {
  beforeEach(() => {
    // Reset mocks
    useMediaQuery.mockClear();
    window.scrollY = 0;
  });

  describe('Desktop View Tests', () => {
    beforeEach(() => {
      useMediaQuery.mockReturnValue(false); // Desktop view
      render(<Header />);
    });

    it('renders logo and brand name', () => {
      expect(screen.getByAltText('logo')).toBeInTheDocument();
      expect(screen.getByText('ASE')).toBeInTheDocument();
    });

    it('renders navigation links', () => {
      expect(screen.getByText('Dịch vụ công chứng')).toBeInTheDocument();
      expect(screen.getByText('Tra cứu hồ sơ công chứng')).toBeInTheDocument();
      expect(screen.getByText('Văn phòng công chứng')).toBeInTheDocument();
      expect(screen.getByText('Đăng ký VPCC')).toBeInTheDocument();
    });

    it('renders auth buttons', () => {
      expect(screen.getByText('Đăng nhập')).toBeInTheDocument();
      expect(screen.getByText('Đăng ký')).toBeInTheDocument();
    });
  });

  describe('Mobile View Tests', () => {
    beforeEach(() => {
      useMediaQuery.mockReturnValue(true); // Mobile view
      render(<Header />);
    });

    it('renders menu icon in mobile view', () => {
      expect(screen.getByLabelText('menu')).toBeInTheDocument();
    });

    it('opens menu on click', () => {
      const menuButton = screen.getByLabelText('menu');
      fireEvent.click(menuButton);

      expect(screen.getByText('Dịch vụ công chứng')).toBeVisible();
      expect(screen.getByText('Đăng nhập')).toBeVisible();
    });

    it('closes menu when item is clicked', () => {
      const menuButton = screen.getByLabelText('menu');
      fireEvent.click(menuButton);

      const menuItem = screen.getByText('Dịch vụ công chứng');
      fireEvent.click(menuItem);

      expect(screen.queryByRole('menu')).not.toBeInTheDocument();
    });
  });

  describe('Scroll Behavior', () => {
    beforeEach(() => {
      useMediaQuery.mockReturnValue(false);
    });

    it('adds elevation on scroll', () => {
      render(<Header />);
      const appBar = screen.getByRole('banner');

      // Simulate scroll
      act(() => {
        window.scrollY = 100;
        window.dispatchEvent(new Event('scroll'));
      });

      expect(appBar).toHaveStyle({
        boxShadow: '0px 4px 20px rgba(0, 0, 0, 0.1)',
      });
    });

    it('removes elevation when scrolled to top', () => {
      render(<Header />);
      const appBar = screen.getByRole('banner');

      // Scroll down then up
      act(() => {
        window.scrollY = 100;
        window.dispatchEvent(new Event('scroll'));
        window.scrollY = 0;
        window.dispatchEvent(new Event('scroll'));
      });

      expect(appBar).toHaveStyle({ boxShadow: 'none' });
    });
  });

  describe('Navigation Tests', () => {
    beforeEach(() => {
      useMediaQuery.mockReturnValue(false);
      render(<Header />);
    });

    it('navigates to home on logo click', () => {
      const logoLink = screen.getByAltText('logo').closest('a');
      expect(logoLink).toHaveAttribute('href', '/');
    });

    it('navigates to correct paths on service links', () => {
      const serviceLinks = screen.getAllByRole('link');
      expect(serviceLinks[1]).toHaveAttribute('href', '/services');
      expect(serviceLinks[2]).toHaveAttribute('href', '/lookup');
    });

    it('navigates to auth pages on button clicks', () => {
      const loginButton = screen.getByText('Đăng nhập').closest('a');
      const registerButton = screen.getByText('Đăng ký').closest('a');

      expect(loginButton).toHaveAttribute('href', '/signin');
      expect(registerButton).toHaveAttribute('href', '/signup');
    });
  });
});
