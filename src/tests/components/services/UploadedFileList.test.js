import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import UploadedFileList from '../../../components/services/UploadedFileList';

describe('UploadedFileList', () => {
  const mockFiles = [
    { name: 'test.pdf', size: 1024 * 1024 },
    { name: 'document.docx', size: 2048 },
    { name: 'image.png', size: 500 }
  ];
  
  const mockOnRemove = jest.fn();

  beforeEach(() => {
    mockOnRemove.mockClear();
  });

  test('renders list of files', () => {
    render(<UploadedFileList files={mockFiles} onRemove={mockOnRemove} />);
    
    mockFiles.forEach(file => {
      expect(screen.getByText(file.name)).toBeInTheDocument();
    });
  });

  test('displays correct file icons', () => {
    render(<UploadedFileList files={mockFiles} onRemove={mockOnRemove} />);
    
    expect(screen.getByTestId('PictureAsPdfRoundedIcon')).toBeInTheDocument();
    expect(screen.getByTestId('ArticleRoundedIcon')).toBeInTheDocument();
    expect(screen.getByTestId('PhotoRoundedIcon')).toBeInTheDocument();
  });

  test('formats file sizes correctly', () => {
    render(<UploadedFileList files={mockFiles} onRemove={mockOnRemove} />);
    
    expect(screen.getByText('1.00 MB')).toBeInTheDocument();
    expect(screen.getByText('2.00 KB')).toBeInTheDocument();
    expect(screen.getByText('500 B')).toBeInTheDocument();
  });

  test('calls onRemove when cancel button is clicked', () => {
    render(<UploadedFileList files={mockFiles} onRemove={mockOnRemove} />);
    
    const cancelButtons = screen.getAllByTestId('CancelIcon');
    fireEvent.click(cancelButtons[0]);
    
    expect(mockOnRemove).toHaveBeenCalledWith(mockFiles[0]);
  });

  test('check circle icons are disabled', () => {
    render(<UploadedFileList files={mockFiles} onRemove={mockOnRemove} />);
    
    const checkButtons = screen.getAllByTestId('CheckCircleIcon')
      .map(icon => icon.closest('button'));
    
    checkButtons.forEach(button => {
      expect(button).toBeDisabled();
    });
  });

  test('applies correct layout styles', () => {
    const { container } = render(
      <UploadedFileList files={mockFiles} onRemove={mockOnRemove} />
    );
    
    const listElement = container.firstChild;
    expect(listElement).toHaveStyle({
      display: 'flex',
      flexDirection: 'column',
      width: '70%'
    });
  });
});
