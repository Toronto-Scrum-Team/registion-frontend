"use client";

import React from "react";

interface AuthButtonProps {
  label: string;
  isLoading?: boolean;
  onClick?: () => void;
  type?: "button" | "submit" | "reset";
  disabled?: boolean;
}

export const AuthButton: React.FC<AuthButtonProps> = ({
  label,
  isLoading = false,
  onClick,
  type = "submit",
  disabled = false,
}) => {
  return (
    <div className="flex justify-center mt-4">
      <button
        type={type}
        onClick={onClick}
        disabled={disabled || isLoading}
        className="auth-button text-[20px] font-bold font-mina px-5 py-1.5 w-[160px]"
      >
        {isLoading ? "LOADING..." : label}
      </button>
    </div>
  );
};
