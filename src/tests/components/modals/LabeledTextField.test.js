import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import LabeledTextField from '../../../components/modals/LabeledTextField';


describe('LabeledTextField', () => {
  const mockOnChange = jest.fn();
  const defaultProps = {
    label: 'Test Label',
    value: '',
    onChange: mockOnChange,
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('renders basic TextField with label', () => {
    render(<LabeledTextField {...defaultProps} />);

    expect(screen.getByText('Test Label')).toBeInTheDocument();
    expect(screen.getByRole('textbox')).toBeInTheDocument();
  });

  test('renders Autocomplete when isAutoComplete is true', () => {
    const options = [{ label: 'Option 1' }, { label: 'Option 2' }];

    render(<LabeledTextField {...defaultProps} isAutoComplete={true} options={options} />);

    expect(screen.getByRole('combobox')).toBeInTheDocument();
  });

  test('handles text input change', () => {
    render(<LabeledTextField {...defaultProps} />);

    const input = screen.getByRole('textbox');
    fireEvent.change(input, { target: { value: 'new value' } });

    expect(mockOnChange).toHaveBeenCalledWith('new value');
  });

  test('handles autocomplete selection', () => {
    const options = [{ label: 'Option 1' }, { label: 'Option 2' }];

    render(<LabeledTextField {...defaultProps} options={options} />);

    const input = screen.getByRole('textbox');
    fireEvent.change(input, { target: { value: 'Option 1' } });

    expect(mockOnChange).toHaveBeenCalled();
  });

  test('applies disabled state', () => {
    render(<LabeledTextField {...defaultProps} disabled={true} />);

    expect(screen.getByRole('textbox')).toBeDisabled();
  });

  test('applies correct styles', () => {
    render(<LabeledTextField {...defaultProps} />);

    const textField = screen.getByRole('textbox').closest('div');
    expect(textField).toHaveClass('MuiInputBase-root');
  });

  test('handles empty options for autocomplete', () => {
    render(<LabeledTextField {...defaultProps} isAutoComplete={true} options={[]} />);

    expect(screen.getByRole('combobox')).toBeInTheDocument();
  });
});
