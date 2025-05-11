"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/lib/auth/useAuth";
import { AuthInput } from "../elements/AuthInput";
import { AuthButton } from "../elements/AuthButton";
import { AuthLink } from "../elements/AuthLink";
import { AuthErrorMessage } from "../elements/AuthErrorMessage";
import { AuthFormContainer } from "../elements/AuthFormContainer";
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
    <div className="relative w-full max-w-[1005px] h-[641px]">
      {/* Background Image */}
      <div className="absolute left-0 top-0 w-[673px] h-[471px] rounded-[100px] shadow-[8px_10px_10px_3px_rgba(0,0,0,0.25)] overflow-hidden">
        <div className="w-full h-full bg-[url('/nightclub-bg.png')] bg-cover bg-center bg-no-repeat"></div>
      </div>

      {/* Form Container */}
      <AuthFormContainer
        title={
          <>
            <h1 className="auth-title text-[42px]">Welcome</h1>
            <div className="h-[42px]"></div>
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

          {/* LOG In Button */}
          <AuthButton
            label="LOG IN"
            isLoading={isLoading}
            disabled={isLoading}
          />

          {/* Register Link */}
          <AuthLink
            text="New to here? Please Register"
            href="/register"
          />
        </form>
      </AuthFormContainer>
    </div>
  );
};
