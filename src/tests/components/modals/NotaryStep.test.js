import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import NotaryStep from '../../../components/modals/NotaryStep';
import { primary } from '../../../config/theme/themePrimitives';

describe('NotaryStep Component', () => {
  const steps = ['Chờ xử lý', 'Đang xử lý', 'Đang xác minh', 'Sẵn sàng ký số', 'Hoàn tất', 'Không hợp lệ'];

  beforeEach(() => {
    jest.clearAllMocks();
    console.log = jest.fn();
  });

  test('renders all steps', () => {
    render(<NotaryStep currentStep={0} />);

    steps.forEach((stepLabel) => {
      expect(screen.getByText(stepLabel)).toBeInTheDocument();
    });
  });

  test('highlights current step correctly', () => {
    const currentStep = 2;
    render(<NotaryStep currentStep={currentStep} />);

    const activeStepLabel = screen.getByText('Đang xác minh');
    expect(activeStepLabel).toBeInTheDocument();
  });

  test('renders check icon for current step', () => {
    render(<NotaryStep currentStep={1} />);

    const checkIcon = screen.getByTestId('CheckCircleIcon');
    expect(checkIcon).toBeInTheDocument();
    expect(checkIcon).toHaveStyle({ color: primary[500] });
  });

  test('disables steps after current step', () => {
    render(<NotaryStep currentStep={2} />);

    // Steps after index 2 should be disabled
    const futureSteps = screen.getAllByRole('button').slice(3);
    futureSteps.forEach((step) => {
      expect(step).toBeDisabled();
    });
  });

  test('enables steps before and at current step', () => {
    render(<NotaryStep currentStep={2} />);

    // Steps before and at index 2 should be enabled
    const activeSteps = screen.getAllByRole('button').slice(0, 3);
    activeSteps.forEach((step) => {
      expect(step).not.toBeDisabled();
    });
  });

  test('handles step click correctly', () => {
    render(<NotaryStep currentStep={3} />);

    const stepButton = screen.getAllByRole('button')[1];
    fireEvent.click(stepButton);

    expect(console.log).toHaveBeenCalledWith('index', 1);
  });

  test('shows correct step numbers', () => {
    render(<NotaryStep currentStep={2} />);

    // Previous steps should show numbers
    const previousSteps = screen.getAllByText(/[1-2]/);
    expect(previousSteps).toHaveLength(2);
  });

  test('applies custom styles to completed steps', () => {
    render(<NotaryStep currentStep={3} />);

    const completedStepLabels = steps.slice(0, 3).map((label) => screen.getByText(label));

    completedStepLabels.forEach((label) => {
      expect(label).toHaveStyle({
        color: primary[500],
      });
    });
  });
});
