import React from 'react';
import { render, screen, waitFor, act } from '@testing-library/react';
import { AuthProvider } from '../AuthContext';
import { useAuth } from '../useAuth';
import { authService, tokenService } from '@/lib/api/auth';

// Mock the auth service and token service
jest.mock('@/lib/api/auth', () => ({
  authService: {
    getCurrentUser: jest.fn(),
    getSessions: jest.fn(),
    login: jest.fn(),
    logout: jest.fn(),
  },
  tokenService: {
    getToken: jest.fn(),
    setToken: jest.fn(),
    removeToken: jest.fn(),
    hasToken: jest.fn(),
  },
}));

const mockAuthService = authService as jest.Mocked<typeof authService>;
const mockTokenService = tokenService as jest.Mocked<typeof tokenService>;

// Test component that uses the auth context
const TestComponent: React.FC = () => {
  const { isAuthenticated, isLoading, user, error } = useAuth();
  
  return (
    <div>
      <div data-testid="is-authenticated">{isAuthenticated.toString()}</div>
      <div data-testid="is-loading">{isLoading.toString()}</div>
      <div data-testid="user">{user ? user.name : 'null'}</div>
      <div data-testid="error">{error || 'null'}</div>
    </div>
  );
};

describe('AuthContext', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    // Reset localStorage
    Object.defineProperty(window, 'localStorage', {
      value: {
        getItem: jest.fn(),
        setItem: jest.fn(),
        removeItem: jest.fn(),
        clear: jest.fn(),
      },
      writable: true,
    });
  });

  describe('initialization', () => {
    it('should start with loading state when token exists', async () => {
      let resolveGetCurrentUser: (value: any) => void;
      const getCurrentUserPromise = new Promise((resolve) => {
        resolveGetCurrentUser = resolve;
      });

      mockTokenService.getToken.mockReturnValue('valid-token');
      mockAuthService.getCurrentUser.mockReturnValue(getCurrentUserPromise as any);

      render(
        <AuthProvider>
          <TestComponent />
        </AuthProvider>
      );

      // Should start with loading state when there's a token to check
      expect(screen.getByTestId('is-loading')).toHaveTextContent('true');
      expect(screen.getByTestId('is-authenticated')).toHaveTextContent('false');
      expect(screen.getByTestId('user')).toHaveTextContent('null');

      // Resolve the promise to complete the test
      act(() => {
        resolveGetCurrentUser(null);
      });

      await waitFor(() => {
        expect(screen.getByTestId('is-loading')).toHaveTextContent('false');
      });
    });

    it('should initialize as not authenticated when no token exists', async () => {
      mockTokenService.getToken.mockReturnValue(null);

      render(
        <AuthProvider>
          <TestComponent />
        </AuthProvider>
      );

      await waitFor(() => {
        expect(screen.getByTestId('is-loading')).toHaveTextContent('false');
      });

      expect(screen.getByTestId('is-authenticated')).toHaveTextContent('false');
      expect(screen.getByTestId('user')).toHaveTextContent('null');
    });

    it('should restore authentication state when valid token exists', async () => {
      const mockUser = {
        id: '1',
        email: 'test@example.com',
        name: 'Test User',
        createdAt: '2023-01-01',
      };

      const mockSessions = {
        sessions: [
          {
            session_id: 'session1',
            user_id: '1',
            expires_at: '2024-01-01',
            device_info: null,
            created_at: '2023-01-01',
            last_accessed_at: '2023-01-01',
          },
        ],
      };

      mockTokenService.getToken.mockReturnValue('valid-token');
      mockAuthService.getCurrentUser.mockResolvedValue(mockUser);
      mockAuthService.getSessions.mockResolvedValue(mockSessions);

      render(
        <AuthProvider>
          <TestComponent />
        </AuthProvider>
      );

      // Should start loading
      expect(screen.getByTestId('is-loading')).toHaveTextContent('true');

      // Wait for authentication to complete
      await waitFor(() => {
        expect(screen.getByTestId('is-loading')).toHaveTextContent('false');
      });

      expect(screen.getByTestId('is-authenticated')).toHaveTextContent('true');
      expect(screen.getByTestId('user')).toHaveTextContent('Test User');
      expect(mockAuthService.getCurrentUser).toHaveBeenCalledWith('valid-token');
      expect(mockAuthService.getSessions).toHaveBeenCalledWith('valid-token');
    });

    it('should handle invalid token by removing it and setting unauthenticated state', async () => {
      mockTokenService.getToken.mockReturnValue('invalid-token');
      mockAuthService.getCurrentUser.mockResolvedValue(null);

      render(
        <AuthProvider>
          <TestComponent />
        </AuthProvider>
      );

      await waitFor(() => {
        expect(screen.getByTestId('is-loading')).toHaveTextContent('false');
      });

      expect(screen.getByTestId('is-authenticated')).toHaveTextContent('false');
      expect(screen.getByTestId('user')).toHaveTextContent('null');
      expect(mockTokenService.removeToken).toHaveBeenCalled();
    });

    it('should handle authentication initialization errors gracefully', async () => {
      mockTokenService.getToken.mockReturnValue('valid-token');
      mockAuthService.getCurrentUser.mockRejectedValue(new Error('Network error'));

      render(
        <AuthProvider>
          <TestComponent />
        </AuthProvider>
      );

      await waitFor(() => {
        expect(screen.getByTestId('is-loading')).toHaveTextContent('false');
      });

      expect(screen.getByTestId('is-authenticated')).toHaveTextContent('false');
      expect(screen.getByTestId('user')).toHaveTextContent('null');
      expect(mockTokenService.removeToken).toHaveBeenCalled();
    });
  });

  describe('session persistence behavior', () => {
    it('should maintain authentication state across component re-renders', async () => {
      const mockUser = {
        id: '1',
        email: 'test@example.com',
        name: 'Test User',
        createdAt: '2023-01-01',
      };

      mockTokenService.getToken.mockReturnValue('valid-token');
      mockAuthService.getCurrentUser.mockResolvedValue(mockUser);
      mockAuthService.getSessions.mockResolvedValue({ sessions: [] });

      const { rerender } = render(
        <AuthProvider>
          <TestComponent />
        </AuthProvider>
      );

      // Wait for initial authentication
      await waitFor(() => {
        expect(screen.getByTestId('is-loading')).toHaveTextContent('false');
      });

      expect(screen.getByTestId('is-authenticated')).toHaveTextContent('true');
      expect(screen.getByTestId('user')).toHaveTextContent('Test User');

      // Re-render the component
      rerender(
        <AuthProvider>
          <TestComponent />
        </AuthProvider>
      );

      // Should maintain the same state without re-initializing
      expect(screen.getByTestId('is-authenticated')).toHaveTextContent('true');
      expect(screen.getByTestId('user')).toHaveTextContent('Test User');
    });

    it('should handle session loading failure gracefully', async () => {
      const mockUser = {
        id: '1',
        email: 'test@example.com',
        name: 'Test User',
        createdAt: '2023-01-01',
      };

      mockTokenService.getToken.mockReturnValue('valid-token');
      mockAuthService.getCurrentUser.mockResolvedValue(mockUser);
      mockAuthService.getSessions.mockRejectedValue(new Error('Session load failed'));

      // Spy on console.error to verify error logging
      const consoleSpy = jest.spyOn(console, 'error').mockImplementation(() => {});

      render(
        <AuthProvider>
          <TestComponent />
        </AuthProvider>
      );

      await waitFor(() => {
        expect(screen.getByTestId('is-loading')).toHaveTextContent('false');
      });

      // Should still be authenticated even if session loading fails
      expect(screen.getByTestId('is-authenticated')).toHaveTextContent('true');
      expect(screen.getByTestId('user')).toHaveTextContent('Test User');
      expect(consoleSpy).toHaveBeenCalledWith('Failed to load sessions:', expect.any(Error));

      consoleSpy.mockRestore();
    });
  });

  describe('loading state management', () => {
    it('should properly manage loading state during authentication check', async () => {
      let resolveGetCurrentUser: (value: any) => void;
      const getCurrentUserPromise = new Promise((resolve) => {
        resolveGetCurrentUser = resolve;
      });

      mockTokenService.getToken.mockReturnValue('valid-token');
      mockAuthService.getCurrentUser.mockReturnValue(getCurrentUserPromise as any);

      render(
        <AuthProvider>
          <TestComponent />
        </AuthProvider>
      );

      // Should be loading initially
      expect(screen.getByTestId('is-loading')).toHaveTextContent('true');
      expect(screen.getByTestId('is-authenticated')).toHaveTextContent('false');

      // Resolve the authentication check
      act(() => {
        resolveGetCurrentUser({
          id: '1',
          email: 'test@example.com',
          name: 'Test User',
          createdAt: '2023-01-01',
        });
      });

      await waitFor(() => {
        expect(screen.getByTestId('is-loading')).toHaveTextContent('false');
      });

      expect(screen.getByTestId('is-authenticated')).toHaveTextContent('true');
    });
  });
});
