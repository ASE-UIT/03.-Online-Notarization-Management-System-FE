import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import Contact from '../../../components/services/Contact';

describe('Contact Component', () => {
  const renderContact = () => {
    return render(<Contact />);
  };

  describe('Render Tests', () => {
    beforeEach(() => {
      renderContact();
    });

    it('renders main heading', () => {
      expect(screen.getByText('Liên hệ')).toBeInTheDocument();
    });

    it('renders subheading text', () => {
      expect(screen.getByText(/Bạn vẫn còn thắc mắc/)).toBeInTheDocument();
    });

    it('renders all form field labels', () => {
      const labels = ['Tên', 'Họ và tên đệm', 'Email', 'Số điện thoại', 'Lời nhắn'];
      labels.forEach((label) => {
        expect(screen.getByText(label)).toBeInTheDocument();
      });
    });

    it('renders submit button', () => {
      expect(screen.getByText('Gửi tin nhắn')).toBeInTheDocument();
    });
  });

  describe('Form Fields', () => {
    beforeEach(() => {
      renderContact();
    });

    it('renders all text fields', () => {
      const textFields = screen.getAllByRole('textbox');
      expect(textFields).toHaveLength(5);
    });

    it('allows text input in name fields', () => {
      const firstName = screen.getAllByRole('textbox')[0];
      const lastName = screen.getAllByRole('textbox')[1];

      fireEvent.change(firstName, { target: { value: 'John' } });
      fireEvent.change(lastName, { target: { value: 'Doe' } });

      expect(firstName.value).toBe('John');
      expect(lastName.value).toBe('Doe');
    });

    it('allows text input in contact fields', () => {
      const email = screen.getAllByRole('textbox')[2];
      const phone = screen.getAllByRole('textbox')[3];

      fireEvent.change(email, { target: { value: 'test@email.com' } });
      fireEvent.change(phone, { target: { value: '1234567890' } });

      expect(email.value).toBe('test@email.com');
      expect(phone.value).toBe('1234567890');
    });

    it('allows text input in message field', () => {
      const message = screen.getAllByRole('textbox')[4];

      fireEvent.change(message, { target: { value: 'Test message' } });
      expect(message.value).toBe('Test message');
    });
  });
});
