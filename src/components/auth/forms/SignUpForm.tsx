"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/lib/auth/useAuth";
import { AuthInput } from "../elements/AuthInput";
import { AuthButton } from "../elements/AuthButton";
import { AuthLink } from "../elements/AuthLink";
import { AuthErrorMessage } from "../elements/AuthErrorMessage";
import { AuthFormContainer } from "../elements/AuthFormContainer";
import { validateEmail, validatePassword, validateName, validatePasswordConfirmation } from "@/lib/utils/validation";

export const SignUpForm: React.FC = () => {
  const router = useRouter();
  const { register, isLoading, error, clearError } = useAuth();

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [formErrors, setFormErrors] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
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
    const newErrors = {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      confirmPassword: ""
    };

    // First name validation
    const firstNameValidation = validateName(formData.firstName, "First name");
    if (!firstNameValidation.isValid) {
      newErrors.firstName = firstNameValidation.message || "First name is required";
      isValid = false;
    }

    // Last name validation
    const lastNameValidation = validateName(formData.lastName, "Last name");
    if (!lastNameValidation.isValid) {
      newErrors.lastName = lastNameValidation.message || "Last name is required";
      isValid = false;
    }

    // Email validation
    const emailValidation = validateEmail(formData.email);
    if (!emailValidation.isValid) {
      newErrors.email = emailValidation.message || "Invalid email";
      isValid = false;
    }

    // Password validation
    const passwordValidation = validatePassword(formData.password);
    if (!passwordValidation.isValid) {
      newErrors.password = passwordValidation.message || "Invalid password";
      isValid = false;
    }

    // Confirm password validation
    const confirmPasswordValidation = validatePasswordConfirmation(
      formData.password,
      formData.confirmPassword
    );
    if (!confirmPasswordValidation.isValid) {
      newErrors.confirmPassword = confirmPasswordValidation.message || "Passwords do not match";
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
          {/* Name Fields - Side by Side */}
          <div className="flex space-x-4">
            {/* First Name Input */}
            <div className="flex-1">
              <AuthInput
                label="First Name"
                type="text"
                name="firstName"
                placeholder="John"
                value={formData.firstName}
                onChange={handleChange}
                error={formErrors.firstName}
              />
            </div>

            {/* Last Name Input */}
            <div className="flex-1">
              <AuthInput
                label="Last Name"
                type="text"
                name="lastName"
                placeholder="Doe"
                value={formData.lastName}
                onChange={handleChange}
                error={formErrors.lastName}
              />
            </div>
          </div>

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
          <div className="space-y-1">
            <AuthInput
              label="Password"
              type="password"
              name="password"
              placeholder="****************"
              value={formData.password}
              onChange={handleChange}
              error={formErrors.password}
            />
            <p className="text-gray-300 text-xs mt-1">
              Password must be at least 8 characters with one uppercase letter, one number, and one special character.
            </p>
          </div>

          {/* Confirm Password Input */}
          <AuthInput
            label="Confirm Password"
            type="password"
            name="confirmPassword"
            placeholder="****************"
            value={formData.confirmPassword}
            onChange={handleChange}
            error={formErrors.confirmPassword}
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
