import { 
  User, 
  LoginCredentials, 
  RegisterCredentials, 
  AuthResponse, 
  LogoutResponse,
  SessionListResponse,
  SessionTerminateRequest,
  SessionTerminateResponse
} from "@/types/auth";
import { validatePassword } from "@/lib/utils/validation";

/**
 * Authentication API service
 * This file contains all the API calls related to authentication
 * Replace the dummy implementations with actual API calls when connecting to your backend
 */

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8080';

export const authService = {
  /**
   * Login user with credentials
   * @param credentials User login credentials
   * @returns Promise with auth response containing token
   */
  login: async (credentials: LoginCredentials): Promise<AuthResponse> => {
    const response = await fetch(`${API_BASE_URL}/auth/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(credentials),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.detail || 'Login failed');
    }

    return response.json();
  },

  /**
   * Register new user
   * @param credentials User registration data
   * @returns Promise with created user data
   */
  register: async (credentials: RegisterCredentials): Promise<User> => {
    const response = await fetch(`${API_BASE_URL}/auth/register`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(credentials),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.detail || 'Registration failed');
    }

    return response.json();
  },

  /**
   * Logout user and terminate all sessions
   * @param token JWT token for authentication
   * @returns Promise with logout response
   */
  logout: async (token: string): Promise<LogoutResponse> => {
    const response = await fetch(`${API_BASE_URL}/auth/logout`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.detail || 'Logout failed');
    }

    return response.json();
  },

  /**
   * Get current user information
   * @param token JWT token for authentication
   * @returns Promise with user data or null if not authenticated
   */
  getCurrentUser: async (token: string): Promise<User | null> => {
    try {
      const response = await fetch(`${API_BASE_URL}/auth/me`, {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        return null;
      }

      return response.json();
    } catch (error) {
      console.error('Failed to get current user:', error);
      return null;
    }
  },

  /**
   * Get all active sessions for the current user
   * @param token JWT token for authentication
   * @returns Promise with session list
   */
  getSessions: async (token: string): Promise<SessionListResponse> => {
    const response = await fetch(`${API_BASE_URL}/sessions/`, {
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.detail || 'Failed to get sessions');
    }

    return response.json();
  },

  /**
   * Terminate a specific session
   * @param token JWT token for authentication
   * @param sessionId Session ID to terminate
   * @returns Promise with termination response
   */
  terminateSession: async (token: string, sessionId: string): Promise<SessionTerminateResponse> => {
    const response = await fetch(`${API_BASE_URL}/sessions/terminate`, {
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ session_id: sessionId } as SessionTerminateRequest),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.detail || 'Failed to terminate session');
    }

    return response.json();
  },

  /**
   * Terminate all sessions for the current user
   * @param token JWT token for authentication
   * @returns Promise with termination response
   */
  terminateAllSessions: async (token: string): Promise<SessionTerminateResponse> => {
    const response = await fetch(`${API_BASE_URL}/sessions/terminate-all`, {
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.detail || 'Failed to terminate all sessions');
    }

    return response.json();
  },

  /**
   * Clean up expired sessions (admin function)
   * @param token JWT token for authentication
   * @returns Promise with cleanup response
   */
  cleanupSessions: async (token: string): Promise<any> => {
    const response = await fetch(`${API_BASE_URL}/sessions/cleanup`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.detail || 'Failed to cleanup sessions');
    }

    return response.json();
  }
};

/**
 * Token management utilities
 */
export const tokenService = {
  /**
   * Store JWT token in localStorage
   * @param token JWT token
   */
  setToken: (token: string): void => {
    localStorage.setItem('auth_token', token);
  },

  /**
   * Get JWT token from localStorage
   * @returns JWT token or null
   */
  getToken: (): string | null => {
    return localStorage.getItem('auth_token');
  },

  /**
   * Remove JWT token from localStorage
   */
  removeToken: (): void => {
    localStorage.removeItem('auth_token');
  },

  /**
   * Check if token exists
   * @returns boolean indicating if token exists
   */
  hasToken: (): boolean => {
    return !!localStorage.getItem('auth_token');
  }
};
