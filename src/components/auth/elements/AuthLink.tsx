"use client";

import React from "react";
import Link from "next/link";

interface AuthLinkProps {
  text: string;
  href: string;
}

export const AuthLink: React.FC<AuthLinkProps> = ({ text, href }) => {
  return (
    <div className="flex justify-center mt-3">
      <Link href={href} className="auth-link text-[14px] font-mina text-center">
        {text}
      </Link>
    </div>
  );
};
