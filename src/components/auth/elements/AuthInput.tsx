"use client";

import React from "react";

interface AuthInputProps {
  label: string;
  type: string;
  name: string;
  placeholder: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  error?: string;
  required?: boolean;
}

export const AuthInput: React.FC<AuthInputProps> = ({
  label,
  type,
  name,
  placeholder,
  value,
  onChange,
  error,
  required = true,
}) => {
  return (
    <div className="space-y-1 w-full">
      <label className="block text-white text-[18px] font-[400] font-mina">
        {label}
      </label>
      <input
        type={type}
        name={name}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        className="auth-input"
        required={required}
      />
      {error && (
        <p className="text-red-500 text-xs mt-1">{error}</p>
      )}
    </div>
  );
};
