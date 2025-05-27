"use client";

import React from "react";

interface AuthErrorMessageProps {
  message: string | null;
}

export const AuthErrorMessage: React.FC<AuthErrorMessageProps> = ({ message }) => {
  if (!message) return null;

  return (
    <div className="bg-red-50 border border-red-200 rounded-md p-3">
      <p className="text-red-600 text-sm">{message}</p>
    </div>
  );
};
