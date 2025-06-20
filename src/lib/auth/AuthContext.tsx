"use client";

import React, { createContext, useReducer, useEffect, ReactNode } from 'react';
import { AuthContextType, AuthState, LoginCredentials, RegisterCredentials, Session } from '@/types/auth';
import { authService, tokenService } from '@/lib/api/auth';

// Initial state
const initialState: AuthState = {
  user: null,
  isAuthenticated: false,
  isLoading: true,
  error: null,
  token: null,
  sessions: [],
};

// Action types
type AuthAction =
  | { type: 'SET_LOADING'; payload: boolean }
  | { type: 'SET_USER'; payload: { user: any; token: string } }
  | { type: 'SET_ERROR'; payload: string | null }
  | { type: 'CLEAR_ERROR' }
  | { type: 'LOGOUT' }
  | { type: 'SET_SESSIONS'; payload: Session[] };

// Reducer
const authReducer = (state: AuthState, action: AuthAction): AuthState => {
  switch (action.type) {
    case 'SET_LOADING':
      return { ...state, isLoading: action.payload };
    case 'SET_USER':
      return {
        ...state,
        user: action.payload.user,
        token: action.payload.token,
        isAuthenticated: true,
        isLoading: false,
        error: null,
      };
    case 'SET_ERROR':
      return { ...state, error: action.payload, isLoading: false };
    case 'CLEAR_ERROR':
      return { ...state, error: null };
    case 'LOGOUT':
      return {
        ...initialState,
        isLoading: false,
      };
    case 'SET_SESSIONS':
      return { ...state, sessions: action.payload };
    default:
      return state;
  }
};

// Create context
export const AuthContext = createContext<AuthContextType | undefined>(undefined);

// AuthProvider component
interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [state, dispatch] = useReducer(authReducer, initialState);

  // Initialize auth state on mount
  useEffect(() => {
    const initializeAuth = async () => {
      try {
        const token = tokenService.getToken();
        if (token) {
          const user = await authService.getCurrentUser(token);
          if (user) {
            dispatch({ type: 'SET_USER', payload: { user, token } });
            // Load sessions
            try {
              const sessionsResponse = await authService.getSessions(token);
              dispatch({ type: 'SET_SESSIONS', payload: sessionsResponse.sessions });
            } catch (error) {
              console.error('Failed to load sessions:', error);
            }
          } else {
            // Token is invalid, remove it
            tokenService.removeToken();
            dispatch({ type: 'SET_LOADING', payload: false });
          }
        } else {
          dispatch({ type: 'SET_LOADING', payload: false });
        }
      } catch (error) {
        console.error('Auth initialization failed:', error);
        tokenService.removeToken();
        dispatch({ type: 'SET_LOADING', payload: false });
      }
    };

    initializeAuth();
  }, []);

  // Login function
  const login = async (credentials: LoginCredentials): Promise<void> => {
    try {
      dispatch({ type: 'SET_LOADING', payload: true });
      dispatch({ type: 'CLEAR_ERROR' });

      const authResponse = await authService.login(credentials);
      const token = authResponse.access_token;

      // Store token
      tokenService.setToken(token);

      // Get user info
      const user = await authService.getCurrentUser(token);
      if (user) {
        dispatch({ type: 'SET_USER', payload: { user, token } });

        // Load sessions
        try {
          const sessionsResponse = await authService.getSessions(token);
          dispatch({ type: 'SET_SESSIONS', payload: sessionsResponse.sessions });
        } catch (error) {
          console.error('Failed to load sessions after login:', error);
        }
      } else {
        throw new Error('Failed to get user information');
      }
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Login failed';
      dispatch({ type: 'SET_ERROR', payload: errorMessage });
      tokenService.removeToken();
      throw error;
    }
  };

  // Register function
  const register = async (credentials: RegisterCredentials): Promise<void> => {
    try {
      dispatch({ type: 'SET_LOADING', payload: true });
      dispatch({ type: 'CLEAR_ERROR' });

      await authService.register(credentials);

      // After successful registration, automatically log in
      await login({
        email: credentials.email,
        password: credentials.password,
      });
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Registration failed';
      dispatch({ type: 'SET_ERROR', payload: errorMessage });
      throw error;
    }
  };

  // Logout function
  const logout = async (): Promise<void> => {
    try {
      const token = tokenService.getToken();
      if (token) {
        try {
          await authService.logout(token);
        } catch (error) {
          console.error('Logout API call failed:', error);
          // Continue with local logout even if API call fails
        }
      }
    } finally {
      tokenService.removeToken();
      dispatch({ type: 'LOGOUT' });
    }
  };

  // Clear error function
  const clearError = (): void => {
    dispatch({ type: 'CLEAR_ERROR' });
  };

  // Refresh sessions function
  const refreshSessions = async (): Promise<void> => {
    try {
      const token = tokenService.getToken();
      if (token) {
        const sessionsResponse = await authService.getSessions(token);
        dispatch({ type: 'SET_SESSIONS', payload: sessionsResponse.sessions });
      }
    } catch (error) {
      console.error('Failed to refresh sessions:', error);
      throw error;
    }
  };

  // Terminate session function
  const terminateSession = async (sessionId: string): Promise<void> => {
    try {
      const token = tokenService.getToken();
      if (token) {
        await authService.terminateSession(token, sessionId);
        await refreshSessions();
      }
    } catch (error) {
      console.error('Failed to terminate session:', error);
      throw error;
    }
  };

  // Terminate all sessions function
  const terminateAllSessions = async (): Promise<void> => {
    try {
      const token = tokenService.getToken();
      if (token) {
        await authService.terminateAllSessions(token);
        await refreshSessions();
      }
    } catch (error) {
      console.error('Failed to terminate all sessions:', error);
      throw error;
    }
  };

  const contextValue: AuthContextType = {
    ...state,
    login,
    register,
    logout,
    clearError,
    refreshSessions,
    terminateSession,
    terminateAllSessions,
  };

  return (
    <AuthContext.Provider value={contextValue}>
      {children}
    </AuthContext.Provider>
  );
};