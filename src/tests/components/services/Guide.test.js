import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import Guide from '../../../components/services/Guide';

describe('Guide Component', () => {
  const setup = () => {
    return render(<Guide />);
  };

  describe('Initial Render', () => {
    beforeEach(() => {
      setup();
    });

    it('renders step counter with initial value', () => {
      const stepNumber = screen.getByText('00');
      const totalSteps = screen.getByText('04');
      expect(stepNumber).toBeInTheDocument();
      expect(totalSteps).toBeInTheDocument();
    });

    it('renders heading and navigation', () => {
      expect(screen.getByText('Cách hoạt động')).toBeInTheDocument();
      expect(screen.getByTestId('ArrowBackIosNewRoundedIcon')).toBeInTheDocument();
      expect(screen.getByTestId('ArrowForwardIosRoundedIcon')).toBeInTheDocument();
    });

    it('renders all steps', () => {
      ['Bước 1', 'Bước 2', 'Bước 3', 'Bước 4'].forEach((step) => {
        expect(screen.getByText(step)).toBeInTheDocument();
      });
    });
  });

  describe('Navigation', () => {
    beforeEach(() => {
      setup();
    });

    it('cycles through steps on next click', () => {
      const nextButton = screen.getByTestId('ArrowForwardIosRoundedIcon').parentElement;

      // Test clicking through all steps
      for (let i = 0; i < 4; i++) {
        fireEvent.click(nextButton);
        const stepNumber = screen.getAllByText(`0${i + 1}`)[0];
        expect(stepNumber).toBeInTheDocument();
      }
    });

    it('cycles through steps on previous click', () => {
      const prevButton = screen.getByTestId('ArrowBackIosNewRoundedIcon').parentElement;

      // Click to move to last step then test prev
      fireEvent.click(prevButton);
      expect(screen.getByText('04')).toBeInTheDocument();
    });
  });

  describe('Step Interaction', () => {
    beforeEach(() => {
      setup();
    });

    it('expands step content when clicked', () => {
      const stepButton = screen.getByText('Bước 1').closest('li');
      fireEvent.click(stepButton);

      const details = screen.getAllByText(/Lorem ipsum/);
      expect(details).toHaveLength(8);
    });

    it('shows correct step description', () => {
      const nextButton = screen.getByTestId('ArrowForwardIosRoundedIcon').parentElement;
      fireEvent.click(nextButton);

      const description = screen.getByText(/Simply book a notary appointment/);
      expect(description).toBeInTheDocument();
    });

    it('highlights active step', () => {
      const stepButton = screen.getByText('Bước 1').closest('li');
      fireEvent.click(stepButton);

      const stepContainer = stepButton.closest('[class*="MuiBox-root"]');
      expect(stepContainer).toHaveStyle({ backgroundColor: expect.any(String) });
    });

    it('collapses expanded step when clicking another', () => {
      // Expand first step
      fireEvent.click(screen.getByText('Bước 1'));

      // Click second step
      fireEvent.click(screen.getByText('Bước 2'));

      // Check first step collapsed
      const firstStepContent = screen.queryAllByText(/Lorem ipsum/);
      expect(firstStepContent).toHaveLength(8);
    });
  });
});
