"use client";

import React from "react";

interface AuthButtonProps {
  label: string;
  isLoading?: boolean;
  onClick?: () => void;
  type?: "button" | "submit" | "reset";
  disabled?: boolean;
  variant?: "primary" | "secondary";
  className?: string;
}

export const AuthButton: React.FC<AuthButtonProps> = ({
  label,
  isLoading = false,
  onClick,
  type = "submit",
  disabled = false,
  variant = "primary",
  className = "",
}) => {
  const baseClasses = variant === "primary" ? "auth-button-primary" : "auth-button-secondary";

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled || isLoading}
      className={`${baseClasses} text-[16px] ${className}`}
      style={{ fontFamily: 'var(--font-open-sans)' }}
    >
      {isLoading ? "Loading..." : label}
    </button>
  );
};
