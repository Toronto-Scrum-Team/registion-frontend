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

  const handleCancel = () => {
    // Clear all form fields
    setFormData({
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      confirmPassword: "",
    });

    // Clear form errors
    setFormErrors({
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      confirmPassword: "",
    });

    // Clear global error
    if (error) {
      clearError();
    }
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
    <div className="flex w-full max-w-6xl mx-auto bg-white rounded-lg overflow-hidden min-h-[700px]">
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
          <h1 className="auth-title text-[32px] mb-2">Create your account</h1>

          {/* Login link */}
          <AuthLink
            regularText="Have an account?"
            linkText="Log in now"
            href="/login"
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

            {/* First Name Input */}
            <AuthInput
              label="First name"
              type="text"
              name="firstName"
              placeholder=""
              value={formData.firstName}
              onChange={handleChange}
              error={formErrors.firstName}
            />

            {/* Last Name Input */}
            <AuthInput
              label="Last name"
              type="text"
              name="lastName"
              placeholder=""
              value={formData.lastName}
              onChange={handleChange}
              error={formErrors.lastName}
            />

            {/* Password Input */}
            <div className="space-y-2 w-full">
              <PasswordInput
                label="Password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                error={formErrors.password}
                placeholder=""
              />

              {/* Password Requirements */}
              <div className="password-requirements text-xs text-gray-600 mt-2 space-y-1">
                <div className="flex items-center space-x-2">
                  <span className={`text-xs ${formData.password.length >= 8 ? 'text-green-600' : 'text-gray-400'}`}>✓</span>
                  <span>Must be at least 8 characters</span>
                </div>
                <div className="flex items-center space-x-2">
                  <span className={`text-xs ${/[A-Z]/.test(formData.password) && /[0-9]/.test(formData.password) && /[!@#$%^&*(),.?":{}|<>]/.test(formData.password) ? 'text-green-600' : 'text-gray-400'}`}>✓</span>
                  <span>Contain at least one uppercase, one number and one special character</span>
                </div>
              </div>
            </div>

            {/* Confirm Password Input */}
            <PasswordInput
              label="Confirm password"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              error={formErrors.confirmPassword}
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
                onClick={handleCancel}
                className="flex-1"
              />
              <AuthButton
                label="Submit"
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
