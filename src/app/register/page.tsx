import React from "react";
import { SignUpForm } from "@/components/auth/forms/SignUpForm";
import { ProtectedRoute } from "@/components/auth/ProtectedRoute";

export default function RegisterPage() {
  return (
    <ProtectedRoute requireAuth={false}>
      <div className="min-h-screen flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 bg-white">
        <SignUpForm />
      </div>
    </ProtectedRoute>
  );
}
