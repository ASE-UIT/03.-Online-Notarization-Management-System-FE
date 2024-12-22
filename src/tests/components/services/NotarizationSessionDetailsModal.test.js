import React from 'react';
import { render, screen, fireEvent, waitFor, act } from '@testing-library/react';
import '@testing-library/jest-dom';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import NotarizationSessionDetailsModal from '../../../components/services/NotarizationSessionDetailsModal';
import SessionService from '../../../services/session.service';
import UserService from '../../../services/user.service';
import { toast } from 'react-toastify';

// Mock services and dependencies
jest.mock('../../../services/session.service');
jest.mock('../../../services/user.service');
jest.mock('react-toastify');
jest.mock('../../../components/static/AvatarWithCloseButton', () => {
  return function MockAvatar({ email, onRemove, isCreator }) {
    return (
      <div 
        data-testid={`avatar-${email}`}
        onClick={onRemove}
        data-creator={isCreator}
      >
        {email}
      </div>
    );
  };
});

describe('NotarizationSessionDetailsModal', () => {
  const mockSession = {
    _id: 'session123',
    sessionName: 'Test Session',
    notaryField: { name: 'Test Field' },
    notaryService: { name: 'Test Service' },
    startDate: '2024-03-20T09:00:00Z',
    endDate: '2024-03-20T10:00:00Z',
    creator: {
      email: 'creator@test.com',
      name: 'Creator Name'
    },
    users: [
      { email: 'user1@test.com' },
      { email: 'user2@test.com' }
    ]
  };

  const renderWithStore = (component, initialState) => {
    const store = createStore(() => ({
      user: { user: { email: 'creator@test.com' } },
      ...initialState
    }));
    return render(<Provider store={store}>{component}</Provider>);
  };

  beforeEach(() => {
    jest.clearAllMocks();
    // Setup default mock responses
    UserService.searchUserByEmail.mockResolvedValue([
      { email: 'newuser@test.com', id: 'user3' }
    ]);
    SessionService.addUser.mockResolvedValue({ success: true });
    SessionService.deleteUserOutOfSession.mockResolvedValue({ success: true });
  });

  describe('Rendering', () => {
    it('renders modal with session details', () => {
      renderWithStore(
        <NotarizationSessionDetailsModal 
          open={true} 
          onClose={jest.fn()} 
          session={mockSession}
        />
      );

      expect(screen.getByText('Test Session')).toBeInTheDocument();
      expect(screen.getByText('Test Field')).toBeInTheDocument();
      expect(screen.getByText('Test Service')).toBeInTheDocument();
      expect(screen.getByText('Chi tiết phiên công chứng')).toBeInTheDocument();
    });

    it('displays formatted date and time', () => {
      renderWithStore(
        <NotarizationSessionDetailsModal 
          open={true} 
          onClose={jest.fn()} 
          session={mockSession}
        />
      );

      expect(screen.getAllByText(/20\/3\/2024/)[0]).toBeInTheDocument();
      expect(screen.getAllByText(/16:00/)[0]).toBeInTheDocument();
    });

    it('shows all participants', () => {
      renderWithStore(
        <NotarizationSessionDetailsModal 
          open={true} 
          onClose={jest.fn()} 
          session={mockSession}
        />
      );

      expect(screen.getByTestId('avatar-creator@test.com')).toBeInTheDocument();
      expect(screen.getByTestId('avatar-user1@test.com')).toBeInTheDocument();
      expect(screen.getByTestId('avatar-user2@test.com')).toBeInTheDocument();
    });
  });

  describe('User Interactions', () => {
    it('handles adding new guest', async () => {
      renderWithStore(
        <NotarizationSessionDetailsModal 
          open={true} 
          onClose={jest.fn()} 
          session={mockSession}
        />
      );

      const input = screen.getByPlaceholderText('Nhập email khách mời');
      const addButton = screen.getByText('Thêm');

      await act(async () => {
        fireEvent.change(input, { target: { value: 'newuser@test.com' } });
        // Wait for debounce
        await new Promise(r => setTimeout(r, 1500));
      });

      await act(async () => {
        fireEvent.click(addButton);
      });

      expect(SessionService.addUser).toHaveBeenCalledWith(
        'session123', 
        ['newuser@test.com']
      );
      expect(toast.success).toHaveBeenCalledWith('Thêm người dùng thành công');
    });

    it('validates email format', async () => {
      renderWithStore(
        <NotarizationSessionDetailsModal 
          open={true} 
          onClose={jest.fn()} 
          session={mockSession}
        />
      );

      const input = screen.getByPlaceholderText('Nhập email khách mời');
      const addButton = screen.getByText('Thêm');

      await act(async () => {
        fireEvent.change(input, { target: { value: 'invalid-email' } });
        fireEvent.click(addButton);
      });

      expect(toast.error).toHaveBeenCalledWith('Địa chỉ email không hợp lệ.');
    });

    it('allows creator to remove guests', async () => {
      renderWithStore(
        <NotarizationSessionDetailsModal 
          open={true} 
          onClose={jest.fn()} 
          session={mockSession}
        />
      );

      const userAvatar = screen.getByTestId('avatar-user1@test.com');

      await act(async () => {
        fireEvent.click(userAvatar);
      });

      expect(SessionService.deleteUserOutOfSession).toHaveBeenCalledWith(
        'session123',
        'user1@test.com'
      );
    });

    it('prevents non-creator from removing guests', () => {
      const store = createStore(() => ({
        user: { user: { email: 'other@test.com' } }
      }));

      render(
        <Provider store={store}>
          <NotarizationSessionDetailsModal 
            open={true} 
            onClose={jest.fn()} 
            session={mockSession}
          />
        </Provider>
      );

      const userAvatar = screen.getByTestId('avatar-user1@test.com');
      expect(userAvatar.getAttribute('data-creator')).toBeFalsy();
    });
  });

  describe('Error Handling', () => {
    it('shows error for duplicate users', async () => {
      renderWithStore(
        <NotarizationSessionDetailsModal 
          open={true} 
          onClose={jest.fn()} 
          session={mockSession}
        />
      );

      const input = screen.getByPlaceholderText('Nhập email khách mời');
      const addButton = screen.getByText('Thêm');

      await act(async () => {
        fireEvent.change(input, { target: { value: 'user1@test.com' } });
        fireEvent.click(addButton);
      });

      expect(toast.error).toHaveBeenCalledWith('Không tìm thấy người dùng.');
    });

    it('handles user search failure', async () => {
      UserService.searchUserByEmail.mockRejectedValue(new Error('Search failed'));

      renderWithStore(
        <NotarizationSessionDetailsModal 
          open={true} 
          onClose={jest.fn()} 
          session={mockSession}
        />
      );

      const input = screen.getByPlaceholderText('Nhập email khách mời');

      await act(async () => {
        fireEvent.change(input, { target: { value: 'test@test.com' } });
        await new Promise(r => setTimeout(r, 1500));
      });

      expect(toast.error).toHaveBeenCalledWith('Không tìm thấy người dùng.');
    });
  });
});