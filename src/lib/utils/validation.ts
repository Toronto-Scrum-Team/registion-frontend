/**
 * Utility functions for form validation
 */

/**
 * Validates if a name field is not empty
 *
 * @param name The name to validate
 * @param fieldName The name of the field (e.g., "First name" or "Last name")
 * @returns An object with isValid flag and error message if invalid
 */
export const validateName = (name: string, fieldName: string): { isValid: boolean; message?: string } => {
  if (!name || name.trim() === '') {
    return { isValid: false, message: `${fieldName} is required` };
  }

  return { isValid: true };
};

/**
 * Validates if a password meets the strength requirements:
 * - Minimum 8 characters
 * - At least one uppercase letter
 * - At least one number
 * - At least one special character
 *
 * @param password The password to validate
 * @returns An object with isValid flag and error message if invalid
 */
export const validatePassword = (password: string): { isValid: boolean; message?: string } => {
  if (!password) {
    return { isValid: false, message: "Password is required" };
  }

  if (password.length < 8) {
    return { isValid: false, message: "Password must be at least 8 characters" };
  }

  if (!/[A-Z]/.test(password)) {
    return { isValid: false, message: "Password must contain at least one uppercase letter" };
  }

  if (!/[0-9]/.test(password)) {
    return { isValid: false, message: "Password must contain at least one number" };
  }

  if (!/[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(password)) {
    return { isValid: false, message: "Password must contain at least one special character" };
  }

  return { isValid: true };
};

/**
 * Validates if an email has a valid format
 *
 * @param email The email to validate
 * @returns An object with isValid flag and error message if invalid
 */
export const validateEmail = (email: string): { isValid: boolean; message?: string } => {
  if (!email) {
    return { isValid: false, message: "Email is required" };
  }

  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return { isValid: false, message: "Please enter a valid email address" };
  }

  return { isValid: true };
};

/**
 * Validates if password confirmation matches the password
 *
 * @param password The password
 * @param confirmPassword The password confirmation
 * @returns An object with isValid flag and error message if invalid
 */
export const validatePasswordConfirmation = (
  password: string,
  confirmPassword: string
): { isValid: boolean; message?: string } => {
  if (!confirmPassword) {
    return { isValid: false, message: "Please confirm your password" };
  }

  if (password !== confirmPassword) {
    return { isValid: false, message: "Passwords do not match" };
  }

  return { isValid: true };
};
