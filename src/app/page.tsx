"use client";

import { useEffect } from "react";
import { useAuth } from "@/lib/auth/useAuth";
import { useRouter } from "next/navigation";

export default function Home() {
  const { isAuthenticated } = useAuth();
  const router = useRouter();

  useEffect(() => {
    // 检查登录状态，根据状态重定向到相应页面
    if (isAuthenticated) {
      router.push("/dashboard");
    } else {
      router.push("/login");
    }
  }, [isAuthenticated, router]);

  // 显示加载状态，等待重定向
  return (
    <div className="min-h-screen flex items-center justify-center bg-[#171717]">
      <div className="flex flex-col items-center">
        <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-[#DBD2CD]"></div>
        <p className="mt-4 text-white font-mina text-xl">Loading The Night Club...</p>
      </div>
    </div>
  );
}
