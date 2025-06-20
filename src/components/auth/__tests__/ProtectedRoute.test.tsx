import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import { useRouter } from 'next/navigation';
import { ProtectedRoute } from '../ProtectedRoute';
import { useAuth } from '@/lib/auth/useAuth';

// Mock Next.js router
jest.mock('next/navigation', () => ({
  useRouter: jest.fn(),
}));

// Mock useAuth hook
jest.mock('@/lib/auth/useAuth', () => ({
  useAuth: jest.fn(),
}));

const mockPush = jest.fn();
const mockUseRouter = useRouter as jest.MockedFunction<typeof useRouter>;
const mockUseAuth = useAuth as jest.MockedFunction<typeof useAuth>;

describe('ProtectedRoute', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    mockUseRouter.mockReturnValue({
      push: mockPush,
      back: jest.fn(),
      forward: jest.fn(),
      refresh: jest.fn(),
      replace: jest.fn(),
      prefetch: jest.fn(),
    });
  });

  describe('when authentication is loading', () => {
    it('should show loading spinner', () => {
      mockUseAuth.mockReturnValue({
        isAuthenticated: false,
        isLoading: true,
        user: null,
        error: null,
        token: null,
        sessions: [],
        login: jest.fn(),
        register: jest.fn(),
        logout: jest.fn(),
        clearError: jest.fn(),
        refreshSessions: jest.fn(),
        terminateSession: jest.fn(),
        terminateAllSessions: jest.fn(),
      });

      render(
        <ProtectedRoute>
          <div>Protected Content</div>
        </ProtectedRoute>
      );

      expect(screen.getByText('Loading...')).toBeInTheDocument();
      expect(screen.queryByText('Protected Content')).not.toBeInTheDocument();
      expect(mockPush).not.toHaveBeenCalled();
    });
  });

  describe('when requireAuth is true (default)', () => {
    it('should render children when authenticated', async () => {
      mockUseAuth.mockReturnValue({
        isAuthenticated: true,
        isLoading: false,
        user: { id: '1', email: 'test@example.com', name: 'Test User', createdAt: '2023-01-01' },
        error: null,
        token: 'mock-token',
        sessions: [],
        login: jest.fn(),
        register: jest.fn(),
        logout: jest.fn(),
        clearError: jest.fn(),
        refreshSessions: jest.fn(),
        terminateSession: jest.fn(),
        terminateAllSessions: jest.fn(),
      });

      render(
        <ProtectedRoute>
          <div>Protected Content</div>
        </ProtectedRoute>
      );

      expect(screen.getByText('Protected Content')).toBeInTheDocument();
      expect(mockPush).not.toHaveBeenCalled();
    });

    it('should redirect to login when not authenticated', async () => {
      mockUseAuth.mockReturnValue({
        isAuthenticated: false,
        isLoading: false,
        user: null,
        error: null,
        token: null,
        sessions: [],
        login: jest.fn(),
        register: jest.fn(),
        logout: jest.fn(),
        clearError: jest.fn(),
        refreshSessions: jest.fn(),
        terminateSession: jest.fn(),
        terminateAllSessions: jest.fn(),
      });

      render(
        <ProtectedRoute>
          <div>Protected Content</div>
        </ProtectedRoute>
      );

      await waitFor(() => {
        expect(mockPush).toHaveBeenCalledWith('/login');
      });

      expect(screen.getByText('Redirecting...')).toBeInTheDocument();
      expect(screen.queryByText('Protected Content')).not.toBeInTheDocument();
    });

    it('should redirect to custom path when specified', async () => {
      mockUseAuth.mockReturnValue({
        isAuthenticated: false,
        isLoading: false,
        user: null,
        error: null,
        token: null,
        sessions: [],
        login: jest.fn(),
        register: jest.fn(),
        logout: jest.fn(),
        clearError: jest.fn(),
        refreshSessions: jest.fn(),
        terminateSession: jest.fn(),
        terminateAllSessions: jest.fn(),
      });

      render(
        <ProtectedRoute redirectTo="/custom-login">
          <div>Protected Content</div>
        </ProtectedRoute>
      );

      await waitFor(() => {
        expect(mockPush).toHaveBeenCalledWith('/custom-login');
      });
    });
  });

  describe('when requireAuth is false', () => {
    it('should render children when not authenticated', () => {
      mockUseAuth.mockReturnValue({
        isAuthenticated: false,
        isLoading: false,
        user: null,
        error: null,
        token: null,
        sessions: [],
        login: jest.fn(),
        register: jest.fn(),
        logout: jest.fn(),
        clearError: jest.fn(),
        refreshSessions: jest.fn(),
        terminateSession: jest.fn(),
        terminateAllSessions: jest.fn(),
      });

      render(
        <ProtectedRoute requireAuth={false}>
          <div>Public Content</div>
        </ProtectedRoute>
      );

      expect(screen.getByText('Public Content')).toBeInTheDocument();
      expect(mockPush).not.toHaveBeenCalled();
    });

    it('should redirect to dashboard when authenticated', async () => {
      mockUseAuth.mockReturnValue({
        isAuthenticated: true,
        isLoading: false,
        user: { id: '1', email: 'test@example.com', name: 'Test User', createdAt: '2023-01-01' },
        error: null,
        token: 'mock-token',
        sessions: [],
        login: jest.fn(),
        register: jest.fn(),
        logout: jest.fn(),
        clearError: jest.fn(),
        refreshSessions: jest.fn(),
        terminateSession: jest.fn(),
        terminateAllSessions: jest.fn(),
      });

      render(
        <ProtectedRoute requireAuth={false}>
          <div>Public Content</div>
        </ProtectedRoute>
      );

      await waitFor(() => {
        expect(mockPush).toHaveBeenCalledWith('/dashboard');
      });

      expect(screen.getByText('Redirecting...')).toBeInTheDocument();
      expect(screen.queryByText('Public Content')).not.toBeInTheDocument();
    });
  });

  describe('authentication state persistence', () => {
    it('should not redirect while loading, even if isAuthenticated is false', () => {
      mockUseAuth.mockReturnValue({
        isAuthenticated: false,
        isLoading: true, // This simulates the initial loading state
        user: null,
        error: null,
        token: null,
        sessions: [],
        login: jest.fn(),
        register: jest.fn(),
        logout: jest.fn(),
        clearError: jest.fn(),
        refreshSessions: jest.fn(),
        terminateSession: jest.fn(),
        terminateAllSessions: jest.fn(),
      });

      render(
        <ProtectedRoute>
          <div>Protected Content</div>
        </ProtectedRoute>
      );

      // Should show loading, not redirect
      expect(screen.getByText('Loading...')).toBeInTheDocument();
      expect(mockPush).not.toHaveBeenCalled();
    });

    it('should wait for loading to complete before making routing decisions', async () => {
      // Start with loading state
      const { rerender } = render(
        <ProtectedRoute>
          <div>Protected Content</div>
        </ProtectedRoute>
      );

      mockUseAuth.mockReturnValue({
        isAuthenticated: false,
        isLoading: true,
        user: null,
        error: null,
        token: null,
        sessions: [],
        login: jest.fn(),
        register: jest.fn(),
        logout: jest.fn(),
        clearError: jest.fn(),
        refreshSessions: jest.fn(),
        terminateSession: jest.fn(),
        terminateAllSessions: jest.fn(),
      });

      rerender(
        <ProtectedRoute>
          <div>Protected Content</div>
        </ProtectedRoute>
      );

      expect(screen.getByText('Loading...')).toBeInTheDocument();
      expect(mockPush).not.toHaveBeenCalled();

      // Simulate authentication check completing with authenticated user
      mockUseAuth.mockReturnValue({
        isAuthenticated: true,
        isLoading: false,
        user: { id: '1', email: 'test@example.com', name: 'Test User', createdAt: '2023-01-01' },
        error: null,
        token: 'mock-token',
        sessions: [],
        login: jest.fn(),
        register: jest.fn(),
        logout: jest.fn(),
        clearError: jest.fn(),
        refreshSessions: jest.fn(),
        terminateSession: jest.fn(),
        terminateAllSessions: jest.fn(),
      });

      rerender(
        <ProtectedRoute>
          <div>Protected Content</div>
        </ProtectedRoute>
      );

      // Should now show protected content without redirecting
      expect(screen.getByText('Protected Content')).toBeInTheDocument();
      expect(mockPush).not.toHaveBeenCalled();
    });
  });
});
