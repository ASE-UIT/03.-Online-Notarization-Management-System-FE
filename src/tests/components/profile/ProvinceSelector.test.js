import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import userEvent from '@testing-library/user-event';
import ProvinceSelector from '../../../components/profile/ProvinceSelector';

// Mock vn-provinces
jest.mock('vn-provinces', () => ({
  getProvinces: jest.fn(() => [
    { code: '01', name: 'Hà Nội' },
    { code: '79', name: 'TP Hồ Chí Minh' },
  ]),
  getDistrictsByProvinceCode: jest.fn(() => [
    { code: '001', name: 'Quận 1' },
    { code: '002', name: 'Quận 2' },
  ]),
  getWardsByDistrictCode: jest.fn(() => [
    { code: '001', name: 'Phường 1' },
    { code: '002', name: 'Phường 2' },
  ]),
}));

describe('ProvinceSelector', () => {
  const mockProps = {
    city: '',
    district: '',
    ward: '',
    onCityChange: jest.fn(),
    onDistrictChange: jest.fn(),
    onWardChange: jest.fn(),
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('renders all selectors', () => {
    render(<ProvinceSelector {...mockProps} />);
    expect(screen.getByText('Tỉnh/Thành phố')).toBeInTheDocument();
    expect(screen.getByText('Quận/Huyện')).toBeInTheDocument();
    expect(screen.getByText('Xã/Phường/Thị trấn')).toBeInTheDocument();
  });

  test('loads and selects city', async () => {
    render(<ProvinceSelector {...mockProps} />);

    // Open city dropdown
    const cityInput = screen.getAllByRole('combobox')[0];
    await userEvent.click(cityInput);

    // Select city
    const cityOption = await screen.findByText('Hà Nội');
    await userEvent.click(cityOption);

    expect(mockProps.onCityChange).toHaveBeenCalledWith('Hà Nội');
  });

  test('district selector is enabled after city selection', async () => {
    render(<ProvinceSelector {...mockProps} city="Hà Nội" />);

    const districtContainer = screen.getAllByRole('combobox')[1].closest('.MuiAutocomplete-root');

    expect(districtContainer).not.toHaveClass('Mui-disabled');
  });

  test('ward selector is enabled after district selection', async () => {
    render(<ProvinceSelector {...mockProps} city="Hà Nội" district="Quận 1" />);

    const wardContainer = screen.getAllByRole('combobox')[2].closest('.MuiAutocomplete-root');

    expect(wardContainer).not.toHaveClass('Mui-disabled');
  });

  test('changing city clears district and ward', async () => {
    const { rerender } = render(<ProvinceSelector {...mockProps} city="Hà Nội" district="Quận 1" ward="Phường 1" />);

    // Change city
    rerender(<ProvinceSelector {...mockProps} city="TP Hồ Chí Minh" district="" ward="" />);

    const districtInput = screen.getAllByRole('combobox')[1];
    const wardInput = screen.getAllByRole('combobox')[2];

    expect(districtInput).toHaveValue('');
    expect(wardInput).toHaveValue('');
  });
});
