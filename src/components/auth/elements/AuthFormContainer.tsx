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
