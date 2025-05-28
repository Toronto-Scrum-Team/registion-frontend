import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import { SignUpForm } from '../SignUpForm';

// Mock the useAuth hook
const mockRegister = jest.fn();
const mockClearError = jest.fn();

jest.mock('@/lib/auth/useAuth', () => ({
  useAuth: () => ({
    register: mockRegister,
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

describe('SignUpForm Cancel Button', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders the cancel button', () => {
    render(<SignUpForm />);

    const cancelButton = screen.getByRole('button', { name: /cancel/i });
    expect(cancelButton).toBeInTheDocument();
  });

  it('cancel button is clickable', () => {
    render(<SignUpForm />);

    const cancelButton = screen.getByRole('button', { name: /cancel/i });
    expect(cancelButton).not.toBeDisabled();

    fireEvent.click(cancelButton);
    // If no error is thrown, the button is clickable
  });

  it('clears all form fields when cancel button is clicked', () => {
    render(<SignUpForm />);

    // Fill in all form fields using getAllByDisplayValue to get all empty inputs
    const allInputs = screen.getAllByDisplayValue('');
    const emailInput = allInputs[0]; // First input is email
    const firstNameInput = allInputs[1]; // Second input is first name
    const lastNameInput = allInputs[2]; // Third input is last name
    const passwordInput = allInputs[3]; // Fourth input is password
    const confirmPasswordInput = allInputs[4]; // Fifth input is confirm password

    fireEvent.change(emailInput, { target: { value: 'test@example.com' } });
    fireEvent.change(firstNameInput, { target: { value: 'John' } });
    fireEvent.change(lastNameInput, { target: { value: 'Doe' } });
    fireEvent.change(passwordInput, { target: { value: 'Password123!' } });
    fireEvent.change(confirmPasswordInput, { target: { value: 'Password123!' } });

    // Verify fields have values
    expect(emailInput).toHaveValue('test@example.com');
    expect(firstNameInput).toHaveValue('John');
    expect(lastNameInput).toHaveValue('Doe');
    expect(passwordInput).toHaveValue('Password123!');
    expect(confirmPasswordInput).toHaveValue('Password123!');

    // Click cancel button
    const cancelButton = screen.getByRole('button', { name: /cancel/i });
    fireEvent.click(cancelButton);

    // Verify all fields are cleared
    expect(emailInput).toHaveValue('');
    expect(firstNameInput).toHaveValue('');
    expect(lastNameInput).toHaveValue('');
    expect(passwordInput).toHaveValue('');
    expect(confirmPasswordInput).toHaveValue('');
  });

  it('returns form to initial empty state when cancel is clicked', () => {
    render(<SignUpForm />);

    // Fill in all form fields using getAllByDisplayValue to get all empty inputs
    const allInputs = screen.getAllByDisplayValue('');
    const emailInput = allInputs[0]; // First input is email
    const firstNameInput = allInputs[1]; // Second input is first name
    const lastNameInput = allInputs[2]; // Third input is last name
    const passwordInput = allInputs[3]; // Fourth input is password
    const confirmPasswordInput = allInputs[4]; // Fifth input is confirm password

    fireEvent.change(emailInput, { target: { value: 'test@example.com' } });
    fireEvent.change(firstNameInput, { target: { value: 'John' } });
    fireEvent.change(lastNameInput, { target: { value: 'Doe' } });
    fireEvent.change(passwordInput, { target: { value: 'Password123!' } });
    fireEvent.change(confirmPasswordInput, { target: { value: 'Password123!' } });

    // Click cancel button
    const cancelButton = screen.getByRole('button', { name: /cancel/i });
    fireEvent.click(cancelButton);

    // Verify form is in initial state (empty values)
    expect(emailInput).toHaveValue('');
    expect(firstNameInput).toHaveValue('');
    expect(lastNameInput).toHaveValue('');
    expect(passwordInput).toHaveValue('');
    expect(confirmPasswordInput).toHaveValue('');

    // Verify attributes are also empty
    expect(emailInput).toHaveAttribute('value', '');
    expect(firstNameInput).toHaveAttribute('value', '');
    expect(lastNameInput).toHaveAttribute('value', '');
    expect(passwordInput).toHaveAttribute('value', '');
    expect(confirmPasswordInput).toHaveAttribute('value', '');
  });
});
