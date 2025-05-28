import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { Mina } from "next/font/google";
import "./globals.css";
import { AuthProvider } from "@/lib/auth/AuthContext";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const mina = Mina({
  weight: ['400', '700'],
  variable: "--font-mina",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "User Registration",
  description: "A modern user registration and authentication system",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${mina.variable} antialiased`}
      >
        <AuthProvider>
          {children}
        </AuthProvider>
      </body>
    </html>
  );
}
