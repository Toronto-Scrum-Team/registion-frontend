import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { AuthButton } from '../AuthButton';

describe('AuthButton', () => {
  it('renders the button with the correct label', () => {
    render(<AuthButton label="LOG IN" />);

    const button = screen.getByRole('button', { name: /log in/i });
    expect(button).toBeInTheDocument();
  });

  it('shows loading text when isLoading is true', () => {
    render(<AuthButton label="LOG IN" isLoading={true} />);

    const button = screen.getByRole('button');
    expect(button).toHaveTextContent(/loading/i);
  });

  it('is disabled when disabled prop is true', () => {
    render(<AuthButton label="LOG IN" disabled={true} />);

    const button = screen.getByRole('button');
    expect(button).toBeDisabled();
  });

  it('is disabled when isLoading is true', () => {
    render(<AuthButton label="LOG IN" isLoading={true} />);

    const button = screen.getByRole('button');
    expect(button).toBeDisabled();
  });
});
