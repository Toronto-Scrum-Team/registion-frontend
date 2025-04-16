"use client";

import React, { createContext, useReducer, useEffect } from "react";
import { AuthState, AuthContextType, LoginCredentials, RegisterCredentials, User } from "@/types/auth";
import { authService } from "@/lib/api/auth";

// Initial state
const initialState: AuthState = {
  user: null,
  isAuthenticated: false,
  isLoading: false,
  error: null,
};

// Create context
export const AuthContext = createContext<AuthContextType>({
  ...initialState,
  login: async () => {},
  register: async () => {},
  logout: async () => {},
  clearError: () => {},
});

// Action types
type AuthAction =
  | { type: "LOGIN_REQUEST" }
  | { type: "LOGIN_SUCCESS"; payload: User }
  | { type: "LOGIN_FAILURE"; payload: string }
  | { type: "REGISTER_REQUEST" }
  | { type: "REGISTER_SUCCESS"; payload: User }
  | { type: "REGISTER_FAILURE"; payload: string }
  | { type: "LOGOUT" }
  | { type: "CLEAR_ERROR" };

// Reducer
const authReducer = (state: AuthState, action: AuthAction): AuthState => {
  switch (action.type) {
    case "LOGIN_REQUEST":
    case "REGISTER_REQUEST":
      return {
        ...state,
        isLoading: true,
        error: null,
      };
    case "LOGIN_SUCCESS":
    case "REGISTER_SUCCESS":
      return {
        ...state,
        isLoading: false,
        isAuthenticated: true,
        user: action.payload,
        error: null,
      };
    case "LOGIN_FAILURE":
    case "REGISTER_FAILURE":
      return {
        ...state,
        isLoading: false,
        isAuthenticated: false,
        user: null,
        error: action.payload,
      };
    case "LOGOUT":
      return {
        ...initialState,
      };
    case "CLEAR_ERROR":
      return {
        ...state,
        error: null,
      };
    default:
      return state;
  }
};

// We now use the authService from @/lib/api/auth instead of defining API functions here

// Provider component
export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [state, dispatch] = useReducer(authReducer, initialState);

  // Check for current user on mount
  useEffect(() => {
    const checkCurrentUser = async () => {
      try {
        const user = await authService.getCurrentUser();
        if (user) {
          dispatch({ type: "LOGIN_SUCCESS", payload: user });
        }
      } catch (error) {
        console.error("Failed to get current user:", error);
      }
    };

    checkCurrentUser();
  }, []);

  // Login function
  const login = async (credentials: LoginCredentials) => {
    dispatch({ type: "LOGIN_REQUEST" });
    try {
      // Call the API service
      const user = await authService.login(credentials);

      // Store user in local storage (handled by authService.getCurrentUser)
      localStorage.setItem("user", JSON.stringify(user));

      // Update state
      dispatch({ type: "LOGIN_SUCCESS", payload: user });
    } catch (error) {
      dispatch({
        type: "LOGIN_FAILURE",
        payload: error instanceof Error ? error.message : "Login failed"
      });
    }
  };

  // Register function
  const register = async (credentials: RegisterCredentials) => {
    dispatch({ type: "REGISTER_REQUEST" });
    try {
      // Call the API service
      const user = await authService.register(credentials);

      // Store user in local storage (handled by authService.getCurrentUser)
      localStorage.setItem("user", JSON.stringify(user));

      // Update state
      dispatch({ type: "REGISTER_SUCCESS", payload: user });
    } catch (error) {
      dispatch({
        type: "REGISTER_FAILURE",
        payload: error instanceof Error ? error.message : "Registration failed"
      });
    }
  };

  // Logout function
  const logout = async () => {
    try {
      // Call the API service
      await authService.logout();

      // Remove user from local storage
      localStorage.removeItem("user");

      // Update state
      dispatch({ type: "LOGOUT" });
    } catch (error) {
      console.error("Logout failed:", error);
      // Still remove user from local storage and update state even if API call fails
      localStorage.removeItem("user");
      dispatch({ type: "LOGOUT" });
    }
  };

  // Clear error
  const clearError = () => {
    dispatch({ type: "CLEAR_ERROR" });
  };

  return (
    <AuthContext.Provider
      value={{
        ...state,
        login,
        register,
        logout,
        clearError,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
