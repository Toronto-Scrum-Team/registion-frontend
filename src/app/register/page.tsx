import React from "react";
import { SignUpForm } from "@/components/auth/forms/SignUpForm";

export default function RegisterPage() {
  return (
    <div className="min-h-screen flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <SignUpForm />
    </div>
  );
}
