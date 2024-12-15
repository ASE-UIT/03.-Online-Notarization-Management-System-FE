import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import NotarizationCardSkeleton from '../../../components/notary/NotarizationCardSkeleton';


describe('NotarizationCardSkeleton', () => {
  test('renders main container with correct styles', () => {
    const { container } = render(<NotarizationCardSkeleton />);
    const mainBox = container.firstChild;

    expect(mainBox).toHaveStyle({
      display: 'flex',
      flexDirection: 'row',
      width: '90%',
      height: '70px',
      border: '1px solid #e5e7ea',
      borderRadius: '4px',
      padding: '16px',
    });
  });

  test('renders all skeleton elements', () => {
    const { container } = render(<NotarizationCardSkeleton />);

    const circularSkeleton = container.querySelector('.MuiSkeleton-circular');
    const textSkeletons = container.querySelectorAll('.MuiSkeleton-text');
    const rectangularSkeleton = container.querySelector('.MuiSkeleton-rectangular');

    expect(circularSkeleton).toBeInTheDocument();
    expect(textSkeletons.length).toBe(5);
    expect(rectangularSkeleton).toBeInTheDocument();
  });

  test('renders dividers', () => {
    const { container } = render(<NotarizationCardSkeleton />);
    const dividers = container.querySelectorAll('.MuiDivider-root');

    expect(dividers.length).toBe(2);
    dividers.forEach((divider) => {
      expect(divider).toBeInTheDocument();
    });
  });

  test('renders GHI CHÚ text', () => {
    render(<NotarizationCardSkeleton />);
    const noteText = screen.getByText('GHI CHÚ');

    expect(noteText).toBeInTheDocument();
  });

  test('renders skeleton elements with correct dimensions', () => {
    const { container } = render(<NotarizationCardSkeleton />);

    const circularSkeleton = container.querySelector('.MuiSkeleton-circular');
    expect(circularSkeleton).toHaveStyle({
      width: '40px',
      height: '40px',
    });

    const buttonSkeleton = container.querySelector('.MuiSkeleton-rectangular');
    expect(buttonSkeleton).toHaveStyle({
      width: '80px',
      height: '30px',
      borderRadius: '4px',
    });
  });

  test('renders layout boxes with correct flex properties', () => {
    const { container } = render(<NotarizationCardSkeleton />);
    const flexBoxes = container.querySelectorAll('.MuiBox-root');

    expect(flexBoxes[0]).toHaveStyle({ display: 'flex' });
    expect(flexBoxes[1]).toHaveStyle({ flex: 1 });
    expect(flexBoxes[4]).toHaveStyle({ flex: 1 });
  });
});
