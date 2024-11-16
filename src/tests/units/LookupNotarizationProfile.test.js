import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import LookupNotarizationProfile from '../../pages/services/LookupNotarizationProfile';
import NotarizationService from '../../services/notarization.service';

// Mock dependencies
jest.mock('react-toastify', () => ({
  toast: {
    error: jest.fn()
  }
}));

jest.mock('../../services/notarization.service', () => ({
  getStatusById: jest.fn()
}));

jest.mock('../../components/services/StatusBox', () => {
  return function MockStatusBox({ status, displayText }) {
    return (
      <div data-testid="status-box">
        Status Box: {status.found ? 'Found' : status.searching ? 'Searching' : 'Not Found'} 
        - {displayText}
      </div>
    );
  };
});

jest.mock('../../components/modals/NotaryDocumentDetailsModal', () => {
  return function MockModal() {
    return <div data-testid="notary-document-modal">Modal Content</div>;
  };
});

describe('LookupNotarizationProfile Component', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders main heading sections', () => {
    render(<LookupNotarizationProfile />);

    expect(screen.getByText('Tra cứu hồ sơ công chứng')).toBeInTheDocument();
    expect(
      screen.getByText(/Vui lòng nhập mã số hồ sơ công chứng để tra cứu/)
    ).toBeInTheDocument();
  });

  it('renders search form elements', () => {
    render(<LookupNotarizationProfile />);

    expect(
      screen.getByPlaceholderText('Nhập mã số hồ sơ công chứng...')
    ).toBeInTheDocument();
    expect(screen.getByText('Tra cứu')).toBeInTheDocument();
  });

  it('renders search input and button', () => {
    render(<LookupNotarizationProfile />);
    
    const searchInput = screen.getByPlaceholderText('Nhập mã số hồ sơ công chứng...');
    const searchButton = screen.getByText('Tra cứu');

    expect(searchInput).toBeInTheDocument();
    expect(searchButton).toBeInTheDocument();
  });

  it('renders StatusBox component when searching', () => {
    render(<LookupNotarizationProfile />);
    
    const searchInput = screen.getByPlaceholderText('Nhập mã số hồ sơ công chứng...');
    const searchButton = screen.getByText('Tra cứu');

    fireEvent.change(searchInput, { target: { value: 'TEST123' } });
    fireEvent.click(searchButton);

    const statusBox = screen.getByTestId('status-box');
    expect(statusBox).toBeInTheDocument();
  });
});