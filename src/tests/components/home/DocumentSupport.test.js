import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import DocumentSupport from '../../../components/home/DocumentSupport';
import { dark, primary, white } from '../../../config/theme/themePrimitives';


describe('DocumentSupport Component', () => {
  const documentTypes = ['Giấy tờ pháp lý', 'Hợp đồng mua bán', 'Giấy chứng nhận quyền sở hữu', 'Thỏa thuận hợp đồng'];

  test('renders component without crashing', () => {
    render(<DocumentSupport />);
    expect(screen.getByText('Hỗ trợ các loại văn bản')).toBeInTheDocument();
  });

  test('displays description text', () => {
    render(<DocumentSupport />);
    expect(screen.getByText(/Chúng tôi cung cấp dịch vụ công chứng/i)).toBeInTheDocument();
  });

  test('renders all document types with arrow icons', () => {
    render(<DocumentSupport />);

    documentTypes.forEach((docType) => {
      const textElement = screen.getByText(docType);
      expect(textElement).toBeInTheDocument();

      // Check if each document type has an associated icon button
      const iconButton = textElement.parentElement.querySelector('button');
      expect(iconButton).toBeInTheDocument();
    });
  });

  test('has correct number of document items', () => {
    render(<DocumentSupport />);
    const documentItems = screen.getAllByRole('button');
    expect(documentItems).toHaveLength(documentTypes.length);
  });

  test('arrow icons have correct styling', () => {
    render(<DocumentSupport />);
    const arrowIcons = screen.getAllByTestId('ArrowCircleRightRoundedIcon');

    arrowIcons.forEach((icon) => {
      expect(icon).toHaveStyle({
        color: primary[500],
        backgroundColor: white[50],
        borderRadius: '50%',
      });
    });
  });
});
