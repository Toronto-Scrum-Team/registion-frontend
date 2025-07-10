"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/lib/auth/useAuth";
import { AuthInput } from "../elements/AuthInput";
import { AuthButton } from "../elements/AuthButton";
import { AuthLink } from "../elements/AuthLink";
import { AuthErrorMessage } from "../elements/AuthErrorMessage";
import { AuthFormContainer } from "../elements/AuthFormContainer";

export const SignUpForm: React.FC = () => {
  const router = useRouter();
  const { register, isLoading, error, clearError } = useAuth();

  const [formData, setFormData] = useState({
    name: "",
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
    if (!formData.email) {
      newErrors.email = "Email is required";
      isValid = false;
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Please enter a valid email address";
      isValid = false;
    }

    // Password validation
    if (!formData.password) {
      newErrors.password = "Password is required";
      isValid = false;
    } else if (formData.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
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
      await register({
        ...formData,
        confirmPassword: formData.password // For API compatibility
      });
      router.push("/dashboard");
    } catch {
      // Error is handled by the auth context
    }
  };

  return (
    <div className="relative w-full max-w-[1005px] h-[641px]">
      {/* Background Image */}
      <div className="absolute left-0 top-0 w-[673px] h-[471px] rounded-[100px] shadow-[8px_10px_10px_3px_rgba(0,0,0,0.25)] overflow-hidden">
        <div className="w-full h-full bg-[url('/nightclub-bg.png')] bg-cover bg-center bg-no-repeat"></div>
      </div>

      {/* Form Container */}
      <AuthFormContainer
        title={
          <>
            <h1 className="auth-title text-[42px]">Sign Up to</h1>
            <h2 className="auth-title text-[42px] underline">The Night Club</h2>
          </>
        }
      >
        <form onSubmit={handleSubmit} className="w-full space-y-4">
          {/* Email Input */}
          <AuthInput
            label="E-mail"
            type="email"
            name="email"
            placeholder="example@service.com"
            value={formData.email}
            onChange={handleChange}
            error={formErrors.email}
          />

          {/* Password Input */}
          <AuthInput
            label="Password"
            type="password"
            name="password"
            placeholder="****************"
            value={formData.password}
            onChange={handleChange}
            error={formErrors.password}
          />

          {/* Error Message */}
          <AuthErrorMessage message={error} />

          {/* Sign Up Button */}
          <AuthButton
            label="SIGN UP"
            isLoading={isLoading}
            disabled={isLoading}
          />

          {/* Login Link */}
          <AuthLink
            text="Already have an account?"
            href="/login"
          />
        </form>
      </AuthFormContainer>
    </div>
  );
};
