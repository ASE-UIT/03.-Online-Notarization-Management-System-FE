import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import VideoCard from '../../../components/static/VideoCard';

// Mock react-intersection-observer
jest.mock('react-intersection-observer', () => ({
  useInView: () => ({
    ref: jest.fn(),
    inView: true,
    threshold: 0.2,
  }),
}));

describe('VideoCard Component', () => {
  const renderVideoCard = () => {
    return render(<VideoCard />);
  };

  describe('Render Tests', () => {
    beforeEach(() => {
      renderVideoCard();
    });

    it('renders the component', () => {
      const paper = screen.getByText(/Bạn vẫn còn thắc mắc/);
      expect(paper).toBeInTheDocument();
    });

    it('renders main heading text', () => {
      expect(screen.getByText(/Bạn vẫn còn thắc mắc?/)).toBeInTheDocument();
      expect(screen.getByText(/Hãy xem video hướng dẫn này./)).toBeInTheDocument();
    });

    it('renders description text', () => {
      expect(screen.getByText(/Video hướng dẫn sử dụng/)).toBeInTheDocument();
    });

    it('renders video element', () => {
      const video = screen.getByTestId('tutorial-video');
      expect(video).toBeInTheDocument();
      expect(video).toHaveAttribute('src', 'https://youtu.be/35KDnej1hlI?si=C8QJyPy5tlLLtQUa');
      expect(video).toHaveAttribute('controls');
    });
  });

  describe('Style Tests', () => {
    it('applies correct paper styles', () => {
      const { container } = renderVideoCard();
      const paper = container.firstChild;

      expect(paper).toHaveStyle({
        display: 'flex',
        flexDirection: 'row',
      });
    });

    it('applies animation styles when in view', () => {
      const { container } = renderVideoCard();
      const paper = container.firstChild;

      expect(paper).toHaveStyle({
        transform: 'translateY(0)',
        opacity: 1,
      });
    });
  });

  describe('Layout Tests', () => {
    it('uses correct flex layout for content', () => {
      const { container } = renderVideoCard();
      const contentBox = container.querySelector('.MuiBox-root');

      expect(contentBox).toHaveStyle({
        display: 'flex',
        flexDirection: 'column',
      });
    });
  });
});
