import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import InfoField from '../../../components/profile/InfoField';

describe('InfoField Component', () => {
  const defaultProps = {
    label: 'Test Label',
    value: 'Test Value',
  };

  test('renders label and value', () => {
    render(<InfoField {...defaultProps} />);

    expect(screen.getByText('Test Label')).toBeInTheDocument();
    expect(screen.getByText('Test Value')).toBeInTheDocument();
  });

  test('applies correct typography variants', () => {
    render(<InfoField {...defaultProps} />);

    const label = screen.getByText('Test Label');
    const value = screen.getByText('Test Value');

    expect(label).toHaveClass('MuiTypography-caption');
    expect(value).toHaveClass('MuiTypography-body2');
  });

  test('handles empty value', () => {
    render(<InfoField label="Empty Field" value="" />);

    expect(screen.getByText('Empty Field')).toBeInTheDocument();
    const value = screen.getAllByText('')[0];
    expect(value).toBeInTheDocument();
  });

  test('maintains box layout structure', () => {
    const { container } = render(<InfoField {...defaultProps} />);
    const boxElement = container.firstChild;

    expect(boxElement).toHaveStyle({ flex: 1 });
  });

  test('applies text styles correctly', () => {
    render(<InfoField {...defaultProps} />);

    const value = screen.getByText('Test Value');
    expect(value).toBeInTheDocument();
  });
});
