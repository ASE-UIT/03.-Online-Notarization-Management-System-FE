import React from 'react';
import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import SessionCard from '../../../components/services/SessionCard';
import '@testing-library/jest-dom';
import { black, green, red, yellow } from '../../../config/theme/themePrimitives';

// Mock Redux store
const mockStore = createStore(() => ({
  user: {
    user: {
      id: 1,
      email: 'test@test.com',
    },
  },
}));

// Mock AvatarIcon
jest.mock('../../../components/static/AvatarIcon', () => {
  return function MockAvatarIcon({ email }) {
    return <div data-testid="avatar-icon">{email}</div>;
  };
});

describe('SessionCard', () => {
  const mockSession = {
    sessionName: 'Test Session',
    endDate: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000).toISOString(),
    creator: {
      name: 'Test Creator',
      email: 'creator@test.com',
    },
    notaryField: { name: 'Test Field' },
    notaryService: { name: 'Test Service' },
    users: [{ email: 'user1@test.com' }, { email: 'user2@test.com' }],
  };

  const renderWithProvider = (component) => {
    return render(<Provider store={mockStore}>{component}</Provider>);
  };

  test('renders basic session information', () => {
    renderWithProvider(<SessionCard session={mockSession} />);

    expect(screen.getByText('Test Session')).toBeInTheDocument();
    expect(screen.getByText(/Test Creator/)).toBeInTheDocument();
    expect(screen.getByText('Test Field')).toBeInTheDocument();
    expect(screen.getByText('Test Service')).toBeInTheDocument();
  });

  test('displays time remaining text correctly', () => {
    renderWithProvider(<SessionCard session={mockSession} />);
    expect(screen.getByText(/Còn \d+ ngày/)).toBeInTheDocument();
  });

  test('displays users avatars correctly', () => {
    renderWithProvider(<SessionCard session={mockSession} />);
    const avatars = screen.getAllByTestId('avatar-icon');
    expect(avatars).toHaveLength(3); // Creator + 2 users
  });

  test('shows expired status for past dates', () => {
    const expiredSession = {
      ...mockSession,
      endDate: new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString(),
    };

    renderWithProvider(<SessionCard session={expiredSession} />);
    expect(screen.getByText(/Đã kết thúc/i)).toBeInTheDocument();
  });
});
