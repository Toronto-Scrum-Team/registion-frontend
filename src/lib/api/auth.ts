import { User, LoginCredentials, RegisterCredentials } from "@/types/auth";
import { validatePassword } from "@/lib/utils/validation";

/**
 * Authentication API service
 * This file contains all the API calls related to authentication
 * Replace the dummy implementations with actual API calls when connecting to your backend
 */
export const authService = {
  /**
   * Login user with credentials
   * @param credentials User login credentials
   * @returns Promise with user data
   */
  login: async (credentials: LoginCredentials): Promise<User> => {
    // TODO: Replace with actual API call to your backend
    // Example implementation with fetch:
    // const response = await fetch('/api/auth/login', {
    //   method: 'POST',
    //   headers: {
    //     'Content-Type': 'application/json',
    //   },
    //   body: JSON.stringify(credentials),
    // });
    //
    // if (!response.ok) {
    //   const error = await response.json();
    //   throw new Error(error.message || 'Login failed');
    // }
    //
    // return response.json();

    // Dummy implementation for development
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        // For demo purposes, accept any email with a valid format
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(credentials.email)) {
          reject(new Error("Invalid email format"));
          return;
        }

        // We don't validate password strength on login, just check if it exists
        if (!credentials.password) {
          reject(new Error("Password is required"));
          return;
        }

        resolve({
          id: "1",
          email: credentials.email,
          name: credentials.email.split("@")[0],
          createdAt: new Date().toISOString(),
        });
      }, 1000);
    });
  },

  /**
   * Register new user
   * @param credentials User registration data
   * @returns Promise with created user data
   */
  register: async (credentials: RegisterCredentials): Promise<User> => {
    // TODO: Replace with actual API call to your backend
    // Example implementation with fetch:
    // const response = await fetch('/api/auth/register', {
    //   method: 'POST',
    //   headers: {
    //     'Content-Type': 'application/json',
    //   },
    //   body: JSON.stringify(credentials),
    // });
    //
    // if (!response.ok) {
    //   const error = await response.json();
    //   throw new Error(error.message || 'Registration failed');
    // }
    //
    // return response.json();

    // Dummy implementation for development
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        // Validate email format
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(credentials.email)) {
          reject(new Error("Invalid email format"));
          return;
        }

        // Validate password match
        if (credentials.password !== credentials.confirmPassword) {
          reject(new Error("Passwords do not match"));
          return;
        }

        // Validate password strength
        const passwordValidation = validatePassword(credentials.password);
        if (!passwordValidation.isValid) {
          reject(new Error(passwordValidation.message));
          return;
        }

        // Combine first and last name for the name field
        const fullName = `${credentials.firstName} ${credentials.lastName}`.trim();

        resolve({
          id: "1",
          email: credentials.email,
          name: fullName || credentials.email.split("@")[0],
          createdAt: new Date().toISOString(),
        });
      }, 1000);
    });
  },

  /**
   * Logout user
   * @returns Promise that resolves when logout is complete
   */
  logout: async (): Promise<void> => {
    // TODO: Replace with actual API call to your backend if needed
    // Example implementation with fetch:
    // const response = await fetch('/api/auth/logout', {
    //   method: 'POST',
    //   credentials: 'include',
    // });
    //
    // if (!response.ok) {
    //   const error = await response.json();
    //   throw new Error(error.message || 'Logout failed');
    // }

    // Dummy implementation for development
    return Promise.resolve();
  },

  /**
   * Get current user
   * @returns Promise with user data or null if not authenticated
   */
  getCurrentUser: async (): Promise<User | null> => {
    // TODO: Replace with actual API call to your backend
    // Example implementation with fetch:
    // try {
    //   const response = await fetch('/api/auth/me', {
    //     credentials: 'include',
    //   });
    //
    //   if (!response.ok) {
    //     return null;
    //   }
    //
    //   return response.json();
    // } catch (error) {
    //   return null;
    // }

    // Dummy implementation for development
    const savedUser = localStorage.getItem("user");
    if (savedUser) {
      try {
        return JSON.parse(savedUser) as User;
      } catch (error) {
        return null;
      }
    }
    return null;
  }
};
