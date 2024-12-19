import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import Home from '../../../src/pages/home/Home';
import React from 'react';

// Mock the Chatbox component
jest.mock('../../../src/components/Chatbox', () => (props) => (
  <div>{props.showChatbox ? 'Chatbox is visible' : 'Chatbox is hidden'}</div>
));

describe('Home Component', () => {
  test('renders Home component correctly', () => {
    render(<Home />);
    expect(screen.getByText('CÔNG CHỨNG QUỐC GIA')).toBeInTheDocument();
    expect(screen.getByText('Công chứng trực tuyến')).toBeInTheDocument();
    expect(screen.getByText('Tạo hồ sơ công chứng')).toBeInTheDocument();
  });

  test('shows chatbox when AssistantIcon is clicked', () => {
    render(<Home />);
    const assistantIcon = screen.getByTestId('assistant-icon')
    fireEvent.click(assistantIcon);
    expect(screen.getByText('Chatbox is visible')).toBeInTheDocument();
  });

  test('renders PhoneIcon with correct tooltip', async () => {
    render(<Home />);
    const phoneIcon = screen.getByTestId('phone-icon');

    // Simulate hover to show tooltip
    fireEvent.mouseOver(phoneIcon);

    // Check for the tooltip text
    expect(await screen.findByText('Liên hệ tổng đài')).toBeInTheDocument();
  });
});
