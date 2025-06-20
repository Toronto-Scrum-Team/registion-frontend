"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/lib/auth/useAuth";
import { ProtectedRoute } from "@/components/auth/ProtectedRoute";

export default function DashboardPage() {
  const { user, logout } = useAuth();
  const router = useRouter();

  const handleLogout = async () => {
    try {
      await logout();
      router.push("/login");
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  return (
    <ProtectedRoute>
      <div className="min-h-screen bg-[#171717] py-8 px-4">
        <div className="max-w-4xl mx-auto space-y-6">
          {/* Header */}
          <div className="bg-[#071922] p-6 rounded-[30px] shadow">
            <div className="flex justify-between items-center">
              <div>
                <h1 className="text-3xl font-bold text-white font-mina mb-2">Dashboard</h1>
                <p className="text-white/70">Welcome back, {user?.name}!</p>
              </div>
              <button
                onClick={handleLogout}
                className="px-6 py-2 bg-red-500/20 text-red-300 rounded-lg border border-red-500/30 hover:bg-red-500/30 transition-colors font-medium"
              >
                Logout
              </button>
            </div>
          </div>

        {/* User Information */}
        <div className="bg-[#071922] p-6 rounded-[20px] shadow">
          <h2 className="text-xl font-bold text-white font-mina mb-4">Account Information</h2>
          <div className="space-y-3">
            <div>
              <label className="text-white/70 text-sm font-medium">Name</label>
              <p className="text-white text-lg">{user?.name}</p>
            </div>
            <div>
              <label className="text-white/70 text-sm font-medium">Email</label>
              <p className="text-white text-lg">{user?.email}</p>
            </div>
            <div>
              <label className="text-white/70 text-sm font-medium">Member Since</label>
              <p className="text-white text-lg">{user?.createdAt ? new Date(user.createdAt).toLocaleDateString() : 'N/A'}</p>
            </div>
          </div>
        </div>





        {/* Footer */}
        <div className="text-center text-white/50 text-sm">
          <p>Registration System - Powered by FastAPI & Next.js</p>
        </div>
      </div>
    </div>
    </ProtectedRoute>
  );
}
