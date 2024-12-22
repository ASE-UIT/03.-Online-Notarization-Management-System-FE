import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import StepCard from '../../../components/static/StepCard';

// Mock react-intersection-observer
jest.mock('react-intersection-observer', () => ({
  useInView: () => ({
    ref: jest.fn(),
    inView: true,
    threshold: 0.2,
  }),
}));

// Mock require for images
jest.mock('../../../assets/images/step1.png', () => 'mocked-image-path', {
  virtual: true,
});

describe('StepCard Component', () => {
  const mockProps = {
    step: {
      title: 'Test Step',
      description: 'Test Description',
      notice: 'Test Notice',
      image: 'step1.png',
    },
    index: 0,
    expandedIndex: null,
    handleExpandClick: jest.fn(),
  };

  const renderStepCard = (props = mockProps) => {
    return render(<StepCard {...props} />);
  };

  describe('Render Tests', () => {
    beforeEach(() => {
      renderStepCard();
    });

    it('renders step number', () => {
      expect(screen.getByText('01/05')).toBeInTheDocument();
    });

    it('renders step title', () => {
      expect(screen.getByText('Test Step')).toBeInTheDocument();
    });

    it('renders step description', () => {
      expect(screen.getByText('Test Description')).toBeInTheDocument();
    });

    it('renders expand button', () => {
      expect(screen.getByText('TÌM HIỂU THÊM')).toBeInTheDocument();
    });

    it('renders step image', () => {
      const image = screen.getByRole('img');
      expect(image).toBeInTheDocument();
      expect(image).toHaveAttribute('alt', 'step');
    });
  });

  describe('Interaction Tests', () => {
    it('calls handleExpandClick when expand button clicked', () => {
      const handleExpandClick = jest.fn();
      renderStepCard({
        ...mockProps,
        handleExpandClick,
      });

      fireEvent.click(screen.getByText('TÌM HIỂU THÊM'));
      expect(handleExpandClick).toHaveBeenCalledWith(0);
    });

    it('shows notice when expanded', () => {
      renderStepCard({
        ...mockProps,
        expandedIndex: 0,
      });

      expect(screen.getByText('Test Notice')).toBeInTheDocument();
    });

    it('hides notice when not expanded', () => {
      renderStepCard({
        ...mockProps,
        expandedIndex: 1,
      });

      expect(screen.queryByText('Test Notice')).not.toBeVisible();
    });
  });

  describe('Style Tests', () => {
    it('applies even index styles', () => {
      const { container } = renderStepCard({
        ...mockProps,
        index: 0,
      });

      const paper = container.firstChild;
      expect(paper).toHaveStyle({
        flexDirection: 'row',
      });
    });

    it('applies odd index styles', () => {
      const { container } = renderStepCard({
        ...mockProps,
        index: 1,
      });

      const paper = container.firstChild;
      expect(paper).toHaveStyle({
        flexDirection: 'row-reverse',
      });
    });
  });
});
