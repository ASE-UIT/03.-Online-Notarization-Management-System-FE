import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import Footer from '../components/Footer';

// Mock image require
jest.mock('../assets/images/ASE-light.png', () => 'mocked-image-path');

describe('Footer Component', () => {
  beforeEach(() => {
    render(<Footer />);
  });

  describe('Render Tests', () => {
    it('renders the footer component', () => {
      const footer = screen.getByTestId('footer-content');
      expect(footer).toBeInTheDocument();
    });

    it('renders company logo', () => {
      const logo = screen.getByAltText('logo');
      expect(logo).toBeInTheDocument();
      expect(logo).toHaveAttribute('src', 'mocked-image-path');
    });

    it('renders company tagline', () => {
      expect(screen.getByText('Hiện đại bậc nhất.')).toBeInTheDocument();
    });
  });

  describe('Social Media Links', () => {
    it('renders all social media icons', () => {
      const socialIcons = screen.getAllByRole('button');
      expect(socialIcons).toHaveLength(3);
    });

    it('renders Facebook icon', () => {
      expect(screen.getByTestId('FacebookIcon')).toBeInTheDocument();
    });

    it('renders Instagram icon', () => {
      expect(screen.getByTestId('InstagramIcon')).toBeInTheDocument();
    });

    it('renders LinkedIn icon', () => {
      expect(screen.getByTestId('LinkedInIcon')).toBeInTheDocument();
    });
  });

  describe('Footer Sections', () => {
    it('renders Home section with correct links', () => {
      const homeLinks = [
        'Chính sách bảo mật',
        'Bảo mật thanh toán',
        'Điều khoản sử dụng',
        'Hướng dẫn sử dụng',
        'Quy chế hoạt động',
        'Cơ chế giải quyết khiếu nại',
      ];

      homeLinks.forEach((link) => {
        expect(screen.getByText(link)).toBeInTheDocument();
      });
    });

    it('renders Products section with correct links', () => {
      const productLinks = ['Giá', 'Dành cho cá nhân', 'Dành cho VPCC'];

      productLinks.forEach((link) => {
        expect(screen.getByText(link)).toBeInTheDocument();
      });
    });

    it('renders About Us section with correct information', () => {
      expect(screen.getByText(/Trụ sở chính:/)).toBeInTheDocument();
      expect(screen.getByText(/Email:/)).toBeInTheDocument();
      expect(screen.getByText(/Số điện thoại:/)).toBeInTheDocument();
    });
  });

  describe('Interactive Elements', () => {
    it('applies hover effect on footer links', () => {
      const link = screen.getByText('Chính sách bảo mật');
      fireEvent.mouseEnter(link);

      const linkContainer = link.closest('[class*="MuiListItemText-root"]');
      expect(linkContainer).toHaveStyle({
        cursor: 'pointer',
      });
    });

    it('social media buttons have correct hover styles', () => {
      const socialButton = screen.getByTestId('FacebookIcon').closest('button');
      expect(socialButton).toHaveStyle({
        color: 'white',
      });
    });
  });
});
