import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import FooterCard from '../../../components/static/FooterCard';

// Mock react-intersection-observer
jest.mock('react-intersection-observer', () => ({
  useInView: () => ({
    ref: jest.fn(),
    inView: true,
    threshold: 0.2,
  }),
}));

describe('FooterCard Component', () => {
  const renderFooterCard = () => {
    return render(<FooterCard />);
  };

  describe('Render Tests', () => {
    beforeEach(() => {
      renderFooterCard();
    });

    it('renders main heading', () => {
      const heading = screen.getByText('Tạo hồ sơ công chứng ngay hôm nay');
      expect(heading).toBeInTheDocument();
    });

    it('renders description text', () => {
      const description = screen.getByText(/Dịch vụ công chứng trực tuyến/);
      expect(description).toBeInTheDocument();
    });

    it('renders call-to-action button', () => {
      const button = screen.getByText('Tạo hồ sơ công chứng');
      expect(button).toBeInTheDocument();
      expect(button.tagName).toBe('BUTTON');
    });
  });

  describe('Style Tests', () => {
    it('applies correct styles when in view', () => {
      const { container } = renderFooterCard();
      const paper = container.firstChild;

      expect(paper).toHaveStyle({
        transform: 'translateY(0)',
        opacity: 1,
      });
    });

    it('renders with correct dimensions', () => {
      const { container } = renderFooterCard();
      const paper = container.firstChild;

      expect(paper).toHaveStyle({
        width: '900px',
        height: '300px',
      });
    });

    it('has gradient background', () => {
      const { container } = renderFooterCard();
      const paper = container.firstChild;

      expect(paper).toHaveStyle({
        background: 'linear-gradient(180deg, rgba(255, 240, 245, 1) 0%, rgba(255, 255, 255, 1) 100%)',
      });
    });
  });

  describe('Layout Tests', () => {
    it('uses flex layout', () => {
      const { container } = renderFooterCard();
      const paper = container.firstChild;
      const contentBox = paper.firstChild;

      expect(paper).toHaveStyle({
        display: 'flex',
        flexDirection: 'row',
      });

      expect(contentBox).toHaveStyle({
        display: 'flex',
        flexDirection: 'column',
      });
    });
  });
});
