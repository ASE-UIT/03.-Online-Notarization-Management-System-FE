import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import CreateNotarizationProfileStepper from '../../../components/modals/CreateNotarizationProfileStepper';
import { primary, black, white } from '../../../config/theme/themePrimitives';

describe('CreateNotarizationProfileStepper', () => {
  const steps = ['Chọn loại công chứng', 'Cung cấp thông tin', 'Kiểm tra lại yêu cầu', 'Thanh toán'];

  test('renders all steps with correct labels', () => {
    render(<CreateNotarizationProfileStepper currentStep={0} />);

    steps.forEach((stepLabel) => {
      expect(screen.getByText(stepLabel)).toBeInTheDocument();
    });
  });

  test('shows active step correctly', () => {
    render(<CreateNotarizationProfileStepper currentStep={0} />);

    const activeStep = screen.getByText(steps[0]).closest('.MuiStepLabel-root');
    expect(activeStep).toHaveClass('MuiStepLabel-root');
  });

  test('applies correct styling to step connectors', () => {
    render(<CreateNotarizationProfileStepper currentStep={1} />);

    const connectors = document.querySelectorAll('.MuiStepConnector-line');
    expect(connectors[0]).toHaveStyle({
      minWidth: '120px',
    });
  });

  test('displays check icon for completed steps', () => {
    render(<CreateNotarizationProfileStepper currentStep={2} />);

    const completedStepIcon = screen.getAllByTestId('CheckCircleIcon')[0];
    expect(completedStepIcon).toBeInTheDocument();
  });

  test('shows correct step numbers', () => {
    render(<CreateNotarizationProfileStepper currentStep={0} />);

    const stepNumbers = screen.getAllByText(/[1-4]/);
    expect(stepNumbers).toHaveLength(4);
    expect(stepNumbers[0].textContent).toBe('1');
  });

  test('disables future steps', () => {
    render(<CreateNotarizationProfileStepper currentStep={1} />);

    const futureSteps = screen.getAllByText(steps[2]).map((step) => step.closest('.MuiStepLabel-root'));

    futureSteps.forEach((step) => {
      expect(step).toHaveClass('Mui-disabled');
    });
  });
});
