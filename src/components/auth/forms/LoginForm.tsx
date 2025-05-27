"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/lib/auth/useAuth";
import { AuthInput } from "../elements/AuthInput";
import { AuthButton } from "../elements/AuthButton";
import { AuthLink } from "../elements/AuthLink";
import { AuthErrorMessage } from "../elements/AuthErrorMessage";
import { PasswordInput } from "../elements/PasswordInput";
// import { AuthFormContainer } from "../elements/AuthFormContainer"; // Removed due to layout redesign - replaced with split-screen layout
import { validateEmail } from "@/lib/utils/validation";

export const LoginForm: React.FC = () => {
  const router = useRouter();
  const { login, isLoading, error, clearError } = useAuth();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [formErrors, setFormErrors] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    // Clear field error when user types
    if (formErrors[name as keyof typeof formErrors]) {
      setFormErrors((prev) => ({ ...prev, [name]: "" }));
    }

    // Clear global error when user types
    if (error) {
      clearError();
    }
  };

  const validateForm = (): boolean => {
    let isValid = true;
    const newErrors = { email: "", password: "" };

    // Email validation
    const emailValidation = validateEmail(formData.email);
    if (!emailValidation.isValid) {
      newErrors.email = emailValidation.message || "Invalid email";
      isValid = false;
    }

    // Password validation
    if (!formData.password) {
      newErrors.password = "Password is required";
      isValid = false;
    }

    setFormErrors(newErrors);
    return isValid;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    try {
      await login(formData);
      router.push("/dashboard");
    } catch {
      // Error is handled by the auth context
    }
  };

  return (
    <div className="flex w-full max-w-6xl mx-auto bg-white rounded-lg overflow-hidden min-h-[600px]">
      {/* Left side - Gray placeholder for illustration */}
      <div className="flex-1 placeholder-area flex items-center justify-center">
        <div className="text-gray-500 text-center">
          <div className="text-4xl mb-2">🎨</div>
          <p className="text-sm">Illustration placeholder</p>
        </div>
      </div>

      {/* Right side - Form */}
      <div className="flex-1 p-12 flex flex-col justify-center">
        <div className="max-w-md mx-auto w-full">
          {/* Title */}
          <h1 className="auth-title text-[32px] mb-2">Log in to your account</h1>

          {/* Sign up link */}
          <AuthLink
            regularText="Don't have an account?"
            linkText="Sign up"
            href="/register"
          />

          <form onSubmit={handleSubmit} className="mt-8 space-y-6">
            {/* Email Input */}
            <AuthInput
              label="Email Address"
              type="email"
              name="email"
              placeholder=""
              value={formData.email}
              onChange={handleChange}
              error={formErrors.email}
            />

            {/* Password Input */}
            <PasswordInput
              label="Password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              error={formErrors.password}
              placeholder=""
            />

            {/* Error Message */}
            <AuthErrorMessage message={error} />

            {/* Buttons */}
            <div className="flex space-x-4 pt-4">
              <AuthButton
                label="Cancel"
                type="button"
                variant="secondary"
                className="flex-1"
              />
              <AuthButton
                label="Login"
                type="submit"
                variant="primary"
                isLoading={isLoading}
                disabled={isLoading}
                className="flex-1"
              />
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};
