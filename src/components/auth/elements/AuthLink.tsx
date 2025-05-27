"use client";

import React from "react";
import Link from "next/link";

interface AuthLinkProps {
  regularText: string;
  linkText: string;
  href: string;
}

export const AuthLink: React.FC<AuthLinkProps> = ({ regularText, linkText, href }) => {
  return (
    <div className="mt-4">
      <span
        className="text-[16px] text-black inline"
        style={{
          fontFamily: 'var(--font-open-sans)',
          verticalAlign: 'baseline',
          lineHeight: '1.4'
        }}
      >
        {regularText}{" "}
      </span>
      <Link
        href={href}
        className="auth-link text-[16px] inline"
        style={{
          fontFamily: 'var(--font-open-sans)',
          verticalAlign: 'baseline',
          lineHeight: '1.4'
        }}
      >
        {linkText}
      </Link>
    </div>
  );
};
