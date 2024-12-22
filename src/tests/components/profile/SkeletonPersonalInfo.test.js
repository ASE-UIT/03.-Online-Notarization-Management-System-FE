import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import PersonalInformationSkeleton from '../../../components/profile/SkeletonPersonalInfo';

describe('PersonalInformationSkeleton', () => {
  beforeEach(() => {
    render(<PersonalInformationSkeleton />);
  });

  test('renders header texts', () => {
    expect(screen.getByText('Thông tin cá nhân')).toBeInTheDocument();
    expect(screen.getByText('Địa chỉ liên hệ')).toBeInTheDocument();
  });

  test('renders disabled edit button', () => {
    const editButton = screen.getByTestId('EditSharpIcon').closest('button');
    expect(editButton).toBeDisabled();
  });

  test('renders correct number of skeleton fields', () => {
    const skeletons = document.querySelectorAll('.MuiSkeleton-root');
    expect(skeletons.length).toBe(17);
  });

  test('has correct layout structure', () => {
    const mainContainer = document.querySelector('.MuiBox-root');
    const gridContainer = mainContainer.firstChild;

    expect(mainContainer).toHaveStyle({
      padding: '20px',
    });
  });
});
