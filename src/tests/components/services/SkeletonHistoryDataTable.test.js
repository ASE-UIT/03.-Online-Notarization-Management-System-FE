import React from 'react';  
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import SkeletonHistoryDataTable from '../../../components/services/SkeletonHistoryDataTable';

describe('SkeletonHistoryDataTable', () => {
  const mockHeadCells = [
    { id: 'id', label: 'ID' },
    { id: 'name', label: 'Name' },
    { id: 'status', label: 'Status' },
    { id: 'date', label: 'Date' },
    { id: 'action', label: 'Action' }
  ];

  test('renders table with headers', () => {
    render(<SkeletonHistoryDataTable headCells={mockHeadCells} />);
    mockHeadCells.forEach(cell => {
      expect(screen.getByText(cell.label)).toBeInTheDocument();
    });
  });

  test('renders checkbox in header', () => {
    render(<SkeletonHistoryDataTable headCells={mockHeadCells} />);
    const checkbox = screen.getByRole('checkbox');
    expect(checkbox).toBeInTheDocument();
  });

  test('renders skeleton rows', () => {
    const { container } = render(<SkeletonHistoryDataTable headCells={mockHeadCells} />);
    const skeletons = container.getElementsByClassName('MuiSkeleton-root');
    expect(skeletons.length).toBe(mockHeadCells.length * 6); 
  });

  test('applies correct header styles', () => {
    const { container } = render(<SkeletonHistoryDataTable headCells={mockHeadCells} />);
    const headerRow = container.querySelector('thead tr');
    expect(headerRow).toHaveClass('MuiTableRow-head');
  });

  test('renders TableContainer with Paper component', () => {
    const { container } = render(<SkeletonHistoryDataTable headCells={mockHeadCells} />);
    const paperComponent = container.querySelector('.MuiPaper-root');
    expect(paperComponent).toBeInTheDocument();
  });

  test('renders correct cell alignments', () => {
    const { container } = render(<SkeletonHistoryDataTable headCells={mockHeadCells} />);
    const cells = container.querySelectorAll('.MuiTableCell-alignLeft');
    expect(cells.length).toBeGreaterThan(0);
  });
});