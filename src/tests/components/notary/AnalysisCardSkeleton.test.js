import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import AnalysisCardSkeleton from '../../../components/notary/AnalysisCardSkeleton';

describe('AnalysisCardSkeleton', () => {
  test('renders skeleton components', () => {
    const { container } = render(<AnalysisCardSkeleton />);
    const skeletons = container.querySelectorAll('.MuiSkeleton-root');
    expect(skeletons).toHaveLength(5);
  });

  test('applies correct layout styles to container', () => {
    const { container } = render(<AnalysisCardSkeleton />);
    const mainBox = container.firstChild;

    expect(mainBox).toHaveStyle({
      display: 'flex',
      flexDirection: 'column',
      border: '2px solid #e0e0e0',
      borderRadius: '4px',
      width: '100%',
    });
  });

  test('renders circular skeleton with correct dimensions', () => {
    const { container } = render(<AnalysisCardSkeleton />);
    const circularSkeleton = container.querySelector('.MuiSkeleton-circular');

    expect(circularSkeleton).toHaveStyle({
      width: '32px',
      height: '32px',
    });
  });

  test('renders text skeletons with correct widths', () => {
    const { container } = render(<AnalysisCardSkeleton />);
    const textSkeletons = container.querySelectorAll('.MuiSkeleton-text');

    const expectedWidths = ['80px', '50px', '30px', '100px'];
    textSkeletons.forEach((skeleton, index) => {
      expect(skeleton).toHaveStyle({
        width: expectedWidths[index],
        height: '26px',
      });
    });
  });

});
