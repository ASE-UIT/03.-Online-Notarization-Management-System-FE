import React from 'react';
import { render, screen, fireEvent, act } from '@testing-library/react';
import '@testing-library/jest-dom';
import Chatbox from '../components/Chatbox';
import { sendMessageToGemini } from '../services/chat.service';

// Mock react-markdown
jest.mock('react-markdown', () => {
  return ({ children }) => <div>{children}</div>;
});

// Mock chat service
jest.mock('../services/chat.service', () => ({
  sendMessageToGemini: jest.fn(),
}));

// Mock scrollIntoView
window.HTMLElement.prototype.scrollIntoView = jest.fn();

describe('Chatbox Component', () => {
  const defaultProps = {
    showChatbox: true,
    setShowChatbox: jest.fn(),
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('Render Tests', () => {
    it('renders chatbox when visible', () => {
      render(<Chatbox {...defaultProps} />);
      expect(screen.getByTestId('chatbox-container')).toBeInTheDocument();
    });

    it('renders message input', () => {
      render(<Chatbox {...defaultProps} />);
      expect(screen.getByPlaceholderText('Nhập tin nhắn...')).toBeInTheDocument();
    });
  });

  describe('Message Handling', () => {
    it('updates input value', () => {
      render(<Chatbox {...defaultProps} />);
      const input = screen.getByPlaceholderText('Nhập tin nhắn...');

      fireEvent.change(input, { target: { value: 'test message' } });
      expect(input.value).toBe('test message');
    });

    it('clears input and calls service after sending', async () => {
      // Setup mock
      sendMessageToGemini.mockResolvedValueOnce('Bot response');

      render(<Chatbox {...defaultProps} />);
      const input = screen.getByPlaceholderText('Nhập tin nhắn...');
      const sendButton = screen.getByTestId('send-button');

      // Interact
      fireEvent.change(input, { target: { value: 'test message' } });
      await act(async () => {
        fireEvent.click(sendButton);
      });

      // Assert
      expect(input.value).toBe('');
      expect(sendMessageToGemini).toHaveBeenCalledWith('test message');
    });

    it('shows loading state while sending message', async () => {
      jest
        .spyOn(require('../services/chat.service'), 'sendMessageToGemini')
        .mockImplementation(() => new Promise((resolve) => setTimeout(resolve, 100)));

      render(<Chatbox {...defaultProps} />);
      const input = screen.getByPlaceholderText('Nhập tin nhắn...');

      fireEvent.change(input, { target: { value: 'test message' } });
      await act(async () => {
        fireEvent.click(screen.getByTestId('send-button'));
      });

      expect(input).toBeDisabled();
      expect(screen.getByTestId('send-button')).toBeDisabled();
    });
  });

  describe('Display Tests', () => {
    it('shows messages list', () => {
      render(<Chatbox {...defaultProps} />);
      expect(screen.getByTestId('messages-container')).toBeInTheDocument();
    });

    it('closes on button click', () => {
      render(<Chatbox {...defaultProps} />);
      const closeButton = screen.getByTestId('close-button');

      fireEvent.click(closeButton);
      expect(defaultProps.setShowChatbox).toHaveBeenCalledWith(false);
    });

    it('scrolls to bottom when new message is added', async () => {
      render(<Chatbox {...defaultProps} />);
      const input = screen.getByPlaceholderText('Nhập tin nhắn...');

      fireEvent.change(input, { target: { value: 'test message' } });
      await act(async () => {
        fireEvent.click(screen.getByTestId('send-button'));
      });

      expect(window.HTMLElement.prototype.scrollIntoView).toHaveBeenCalled();
    });
  });
});
