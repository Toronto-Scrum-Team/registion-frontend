"use client";

import React, { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/lib/auth/useAuth";

export default function DashboardPage() {
  const { user, isAuthenticated } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!isAuthenticated) {
      router.push("/login");
    }
  }, [isAuthenticated, router]);

  if (!isAuthenticated || !user) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#171717]">
        <div className="flex flex-col items-center">
          <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-[#DBD2CD]"></div>
          <p className="mt-4 text-white font-mina text-xl">Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#171717]">
      <div className="bg-[#071922] p-8 rounded-[30px] shadow max-w-md w-full">
        <h1 className="text-2xl font-bold text-white font-mina text-center mb-6">Dashboard</h1>
        <p className="text-white text-center mb-4">
          Authentication successful! Welcome, {user.name}.
        </p>
        <p className="text-white/70 text-center text-sm">
          This is a placeholder dashboard page. The actual dashboard content will be implemented in future commits.
        </p>
      </div>
    </div>
  );
}
