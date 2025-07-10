"use client";

import React from "react";

interface AuthErrorMessageProps {
  message: string | null;
}

export const AuthErrorMessage: React.FC<AuthErrorMessageProps> = ({ message }) => {
  if (!message) return null;
  
  return (
    <div className="bg-red-500/20 border border-red-500 rounded-md p-2">
      <p className="text-red-500 text-xs">{message}</p>
    </div>
  );
};
