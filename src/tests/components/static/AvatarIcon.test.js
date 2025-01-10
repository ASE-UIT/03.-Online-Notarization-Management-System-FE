import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import AvatarIcon from '../../../components/static/AvatarIcon';

describe('AvatarIcon Component', () => {
  const mockEmail = 'test@example.com';

  const renderAvatarIcon = (email = mockEmail) => {
    return render(<AvatarIcon email={email} />);
  };

  describe('Render Tests', () => {
    it('renders the component', () => {
      const { container } = renderAvatarIcon();
      expect(container.firstChild).toBeInTheDocument();
    });

    it('displays correct initial letter', () => {
      renderAvatarIcon();
      expect(screen.getByText('T')).toBeInTheDocument();
    });

    it('renders with uppercase initial', () => {
      renderAvatarIcon('example@test.com');
      expect(screen.getByText('E')).toBeInTheDocument();
    });
  });

  describe('Style Tests', () => {
    it('has correct container styles', () => {
      const { container } = renderAvatarIcon();
      const wrapper = container.firstChild;

      expect(wrapper).toHaveStyle({
        position: 'relative',
        display: 'inline-block',
        marginRight: '8px',
      });
    });

    it('renders Avatar with correct dimensions', () => {
      const { container } = renderAvatarIcon();
      const avatar = container.querySelector('.MuiAvatar-root');

      expect(avatar).toHaveStyle({
        width: '24px',
        height: '24px',
      });
    });
  });
});
