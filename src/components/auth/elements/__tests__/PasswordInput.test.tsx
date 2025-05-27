import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import { PasswordInput } from '../PasswordInput';

describe('PasswordInput', () => {
  const mockOnChange = jest.fn();
  const defaultProps = {
    label: 'Password',
    name: 'password',
    value: '',
    onChange: mockOnChange,
  };

  beforeEach(() => {
    mockOnChange.mockClear();
  });

  it('renders the password input with label', () => {
    render(<PasswordInput {...defaultProps} />);
    
    expect(screen.getByLabelText('Password')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /show password/i })).toBeInTheDocument();
  });

  it('toggles password visibility when eye button is clicked', () => {
    render(<PasswordInput {...defaultProps} value="testpassword" />);
    
    const input = screen.getByLabelText('Password') as HTMLInputElement;
    const toggleButton = screen.getByRole('button', { name: /show password/i });
    
    // Initially should be password type
    expect(input.type).toBe('password');
    
    // Click to show password
    fireEvent.click(toggleButton);
    expect(input.type).toBe('text');
    expect(screen.getByRole('button', { name: /hide password/i })).toBeInTheDocument();
    
    // Click to hide password again
    fireEvent.click(toggleButton);
    expect(input.type).toBe('password');
    expect(screen.getByRole('button', { name: /show password/i })).toBeInTheDocument();
  });

  it('displays error message when error prop is provided', () => {
    render(<PasswordInput {...defaultProps} error="Password is required" />);
    
    expect(screen.getByText('Password is required')).toBeInTheDocument();
  });

  it('calls onChange when input value changes', () => {
    render(<PasswordInput {...defaultProps} />);
    
    const input = screen.getByLabelText('Password');
    fireEvent.change(input, { target: { value: 'newpassword' } });
    
    expect(mockOnChange).toHaveBeenCalledTimes(1);
  });

  it('has proper accessibility attributes', () => {
    render(<PasswordInput {...defaultProps} />);
    
    const toggleButton = screen.getByRole('button', { name: /show password/i });
    expect(toggleButton).toHaveAttribute('aria-label', 'Show password');
    expect(toggleButton).toHaveAttribute('type', 'button');
  });

  it('maintains independent state for multiple instances', () => {
    render(
      <div>
        <PasswordInput {...defaultProps} name="password1" />
        <PasswordInput {...defaultProps} name="password2" label="Confirm Password" />
      </div>
    );
    
    const toggleButtons = screen.getAllByRole('button', { name: /show password/i });
    const inputs = screen.getAllByDisplayValue('') as HTMLInputElement[];
    
    // Toggle first password
    fireEvent.click(toggleButtons[0]);
    expect(inputs[0].type).toBe('text');
    expect(inputs[1].type).toBe('password'); // Second should remain password type
    
    // Toggle second password
    fireEvent.click(toggleButtons[1]);
    expect(inputs[0].type).toBe('text');
    expect(inputs[1].type).toBe('text');
  });
});
