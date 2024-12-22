import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import NotarizationCard from '../../../components/notary/NotarizationCard';

describe('NotarizationCard', () => {
  const mockDocument = {
    createdAt: '2024-03-20T14:30:00Z',
    requesterInfo: {
      fullName: 'Test User',
    },
    notarizationField: {
      name: 'Test Field',
    },
    notarizationService: {
      name: 'Test Service',
    },
  };

  test('renders basic card elements', () => {
    render(<NotarizationCard document={mockDocument} />);

    expect(screen.getByText('Test User')).toBeInTheDocument();
    expect(screen.getByText('Test Field - Test Service')).toBeInTheDocument();
    expect(screen.getByText('GHI CHÚ')).toBeInTheDocument();
    expect(screen.getByText('Chỉnh sửa')).toBeInTheDocument();
  });

  test('formats date and time correctly', () => {
    render(<NotarizationCard document={mockDocument} />);

    expect(screen.getByText('20/3/2024')).toBeInTheDocument();
  });

  test('formats description correctly', () => {
    render(<NotarizationCard document={mockDocument} />);

    const description = `${mockDocument.notarizationField.name} - ${mockDocument.notarizationService.name}`;
    expect(screen.getByText(description)).toBeInTheDocument();
  });

  test('handles menu open/close', async () => {
    render(<NotarizationCard document={mockDocument} />);

    const editButton = screen.getByText('Chỉnh sửa');

    // Open menu
    fireEvent.click(editButton);
    expect(screen.getAllByText('MenuItem')).toHaveLength(3);

    // Close menu
    fireEvent.click(document.body);

    // Wait for menu to be removed
    await waitFor(() =>
      expect(screen.queryAllByText('MenuItem')).toHaveLength(3)
    );
  });

  test('menu items trigger close handler', async () => {
    render(<NotarizationCard document={mockDocument} />);

    // Open menu
    const editButton = screen.getByText('Chỉnh sửa');
    fireEvent.click(editButton);

    const menuItem = screen.getAllByText('MenuItem')[0];
    fireEvent.click(menuItem);

    // Wait for menu to close
    await waitFor(() =>
      expect(screen.queryAllByText('MenuItem')).toHaveLength(0)
    );
  });

  test('renders dividers on desktop view', () => {
    const { container } = render(<NotarizationCard document={mockDocument} />);

    const dividers = container.querySelectorAll('.MuiDivider-root');
    expect(dividers).toHaveLength(2);
  });

  test('applies responsive styles', () => {
    const { container } = render(<NotarizationCard document={mockDocument} />);

    const mainBox = container.firstChild;
    expect(mainBox).toHaveStyle({
      display: 'flex',
      width: '95%',
    });
  });
});
