/**
 * AuthFormContainer Component
 *
 * STATUS: Currently unused - replaced by new layout design
 *
 * ORIGINAL PURPOSE:
 * This component was designed to provide a consistent container for authentication forms
 * in the original dark theme design. It featured:
 * - Dark background with rounded corners (100px border-radius)
 * - Drop shadow styling for depth
 * - Fixed positioning for overlay-style layout
 * - Centered title and form content arrangement
 *
 * REPLACEMENT REASON:
 * The UI was redesigned from a dark theme with nightclub background image and overlay forms
 * to a clean, modern split-screen layout with:
 * - White background
 * - Left side: Gray placeholder area for illustrations
 * - Right side: Clean form layout with standard styling
 * - Responsive design with better accessibility
 *
 * FUTURE USE CASES:
 * This component could be reused for:
 * - Alternative authentication flows that need overlay-style forms
 * - Admin panels or dashboard areas that use the original dark theme
 *
 * REPLACED BY: Direct layout implementation in LoginForm.tsx and SignUpForm.tsx
 */

"use client";

import React, { ReactNode } from "react";

interface AuthFormContainerProps {
  children: ReactNode;
  title: ReactNode;
}

export const AuthFormContainer: React.FC<AuthFormContainerProps> = ({
  children,
  title,
}) => {
  return (
    <div className="absolute right-0 top-[20px] w-[531px] h-[621px] auth-form-container">
      <div className="flex flex-col items-center h-full px-4 py-6">
        <div className="flex-1 flex flex-col justify-center items-center">
          {/* Title Container - Fixed Height */}
          <div className="flex flex-col justify-center items-center mb-8 h-[120px] w-full">
            {title}
          </div>

          {/* Form Container - Fixed Width */}
          <div className="w-full flex justify-center">
            <div className="w-[350px]">
              {children}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
