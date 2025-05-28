import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import { LoginForm } from '../LoginForm';

// Mock the useAuth hook
const mockLogin = jest.fn();
const mockClearError = jest.fn();

jest.mock('@/lib/auth/useAuth', () => ({
  useAuth: () => ({
    login: mockLogin,
    isLoading: false,
    error: null,
    clearError: mockClearError,
  }),
}));

// Mock the useRouter hook
const mockPush = jest.fn();
jest.mock('next/navigation', () => ({
  useRouter: () => ({
    push: mockPush,
  }),
}));

describe('LoginForm Cancel Button', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders the cancel button', () => {
    render(<LoginForm />);

    const cancelButton = screen.getByRole('button', { name: /cancel/i });
    expect(cancelButton).toBeInTheDocument();
  });

  it('cancel button is clickable', () => {
    render(<LoginForm />);

    const cancelButton = screen.getByRole('button', { name: /cancel/i });
    expect(cancelButton).not.toBeDisabled();

    fireEvent.click(cancelButton);
    // If no error is thrown, the button is clickable
  });

  it('clears all form fields when cancel button is clicked', () => {
    render(<LoginForm />);

    // Fill in the form fields using getAllByDisplayValue to get all empty inputs
    const allInputs = screen.getAllByDisplayValue('');
    const emailInput = allInputs[0]; // First input is email
    const passwordInput = allInputs[1]; // Second input is password

    fireEvent.change(emailInput, { target: { value: 'test@example.com' } });
    fireEvent.change(passwordInput, { target: { value: 'password123' } });

    // Verify fields have values
    expect(emailInput).toHaveValue('test@example.com');
    expect(passwordInput).toHaveValue('password123');

    // Click cancel button
    const cancelButton = screen.getByRole('button', { name: /cancel/i });
    fireEvent.click(cancelButton);

    // Verify fields are cleared
    expect(emailInput).toHaveValue('');
    expect(passwordInput).toHaveValue('');
  });

  it('returns form to initial empty state when cancel is clicked', () => {
    render(<LoginForm />);

    // Fill in the form fields using getAllByDisplayValue to get all empty inputs
    const allInputs = screen.getAllByDisplayValue('');
    const emailInput = allInputs[0]; // First input is email
    const passwordInput = allInputs[1]; // Second input is password

    fireEvent.change(emailInput, { target: { value: 'test@example.com' } });
    fireEvent.change(passwordInput, { target: { value: 'password123' } });

    // Click cancel button
    const cancelButton = screen.getByRole('button', { name: /cancel/i });
    fireEvent.click(cancelButton);

    // Verify form is in initial state (empty values)
    expect(emailInput).toHaveValue('');
    expect(passwordInput).toHaveValue('');
    expect(emailInput).toHaveAttribute('value', '');
    expect(passwordInput).toHaveAttribute('value', '');
  });
});
