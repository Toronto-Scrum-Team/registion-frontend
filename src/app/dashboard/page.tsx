"use client";

import React, { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/lib/auth/useAuth";
import { Navbar } from '@/components/dashboard';


export default function DashboardPage() {
  const { user, isAuthenticated } = useAuth();
  const router = useRouter();

  //check if log out
  useEffect(() => {
    if (!isAuthenticated) {
      router.push("/login");
    }
  }, [isAuthenticated, router]);

  //navbar routers
  //   if (isAuthenticated) {
  //     router.push("/dashboard");
  //   } else {
  //     router.push("/login");
  //   }
  // }, [isAuthenticated, router]);

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
    <div className="bg-blue-500">
      <Navbar />
    </div>
  );
}
