import React from 'react';
import { render, screen } from '@testing-library/react';
import CreateNotarizationSession from '../../pages/services/CreateNotarizationSession';

describe('CreateNotarizationSession', () => {
  it('renders the component', () => {
    render(<CreateNotarizationSession />);
    const heading = screen.getByRole('heading');
    expect(heading).toHaveTextContent('Tạo phiên công chứng nhiều người');
  });

  it('should display a search input', () => {
    render(<CreateNotarizationSession />);
    const searchInput = screen.getByPlaceholderText('Tìm kiếm phiên công chứng...');
    expect(searchInput).toBeInTheDocument();
  });
});
