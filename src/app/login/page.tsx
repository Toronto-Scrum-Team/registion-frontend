import React from "react";
import { LoginForm } from "@/components/auth/forms/LoginForm";
import { ProtectedRoute } from "@/components/auth/ProtectedRoute";

export default function LoginPage() {
  return (
    <ProtectedRoute requireAuth={false}>
      <div className="min-h-screen flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 bg-white">
        <LoginForm />
      </div>
    </ProtectedRoute>
  );
}
