import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import AnalysisCard from '../../../components/notary/AnalysisCard';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';

describe('AnalysisCard', () => {
  const defaultProps = {
    icon: <ArrowUpwardIcon />,
    title: 'Test Title',
    mainText: '1,234',
    deltaText: '+5.2%',
    deltaDescription: 'vs last month',
    iconBgColor: '#e3f2fd',
    iconColor: '#2196f3',
    deltaColor: '#4caf50',
  };

  test('renders with all props', () => {
    render(<AnalysisCard {...defaultProps} />);

    expect(screen.getByText('Test Title')).toBeInTheDocument();
    expect(screen.getByText('1,234')).toBeInTheDocument();
    expect(screen.getByText('+5.2%')).toBeInTheDocument();
    expect(screen.getByText('vs last month')).toBeInTheDocument();
  });

  test('applies custom icon styles', () => {
    render(<AnalysisCard {...defaultProps} />);

    const icon = screen.getByTestId('ArrowUpwardIcon');
    expect(icon).toHaveStyle({
      backgroundColor: '#e3f2fd',
      color: '#2196f3',
      borderRadius: '4px',
      padding: '8px',
    });
  });

  test('applies custom text styles', () => {
    render(<AnalysisCard {...defaultProps} />);

    const title = screen.getByText('Test Title');
    const mainText = screen.getByText('1,234');
    const deltaText = screen.getByText('+5.2%');

    expect(title).toHaveStyle({ fontSize: '18px', fontWeight: 500 });
    expect(mainText).toHaveStyle({ fontSize: '26px', fontWeight: 500 });
    expect(deltaText).toHaveStyle({ color: '#4caf50' });
  });

  test('renders with minimal props', () => {
    const minimalProps = {
      icon: <ArrowUpwardIcon />,
      title: 'Minimal Title',
      mainText: '100',
    };

    render(<AnalysisCard {...minimalProps} />);

    expect(screen.getByText('Minimal Title')).toBeInTheDocument();
    expect(screen.getByText('100')).toBeInTheDocument();
  });

  test('maintains layout structure', () => {
    render(<AnalysisCard {...defaultProps} />);

    const container = screen.getByText('Test Title').closest('div');
    expect(container).toBeInTheDocument();
  });

  test('applies border styles', () => {
    render(<AnalysisCard {...defaultProps} />);

    const card = screen.getByText('Test Title').closest('div').parentElement;
    expect(card).toHaveStyle({
      border: '2px solid #e5e7ea',
      borderRadius: '4px',
    });
  });
});
