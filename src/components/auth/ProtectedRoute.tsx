"use client";

import React, { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/lib/auth/useAuth";

interface ProtectedRouteProps {
  children: React.ReactNode;
  redirectTo?: string;
  requireAuth?: boolean;
}

/**
 * ProtectedRoute component that handles authentication-based route protection
 * 
 * @param children - The components to render if access is allowed
 * @param redirectTo - The path to redirect to if access is denied (default: "/login")
 * @param requireAuth - Whether authentication is required (default: true)
 */
export const ProtectedRoute: React.FC<ProtectedRouteProps> = ({
  children,
  redirectTo = "/login",
  requireAuth = true,
}) => {
  const { isAuthenticated, isLoading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    // Only redirect after loading is complete
    if (!isLoading) {
      if (requireAuth && !isAuthenticated) {
        router.push(redirectTo);
      } else if (!requireAuth && isAuthenticated) {
        // For pages that should only be accessible when NOT authenticated (like login/register)
        router.push("/dashboard");
      }
    }
  }, [isAuthenticated, isLoading, requireAuth, redirectTo, router]);

  // Show loading spinner while authentication state is being determined
  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#171717]">
        <div className="flex flex-col items-center">
          <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-[#DBD2CD]"></div>
          <p className="mt-4 text-white font-mina text-xl">Loading...</p>
        </div>
      </div>
    );
  }

  // For protected routes: only render children if authenticated
  if (requireAuth && !isAuthenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#171717]">
        <div className="flex flex-col items-center">
          <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-[#DBD2CD]"></div>
          <p className="mt-4 text-white font-mina text-xl">Redirecting...</p>
        </div>
      </div>
    );
  }

  // For public routes that should redirect authenticated users: only render if not authenticated
  if (!requireAuth && isAuthenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#171717]">
        <div className="flex flex-col items-center">
          <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-[#DBD2CD]"></div>
          <p className="mt-4 text-white font-mina text-xl">Redirecting...</p>
        </div>
      </div>
    );
  }

  // Render children if all conditions are met
  return <>{children}</>;
};
