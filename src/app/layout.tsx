import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { Mina } from "next/font/google";
import localFont from "next/font/local";
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

// IBM Plex Serif for page titles
const ibmPlexSerif = localFont({
  src: [
    {
      path: "../../public/fonts/IBM_Plex_Serif/IBMPlexSerif-Regular.ttf",
      weight: "400",
      style: "normal",
    },
  ],
  variable: "--font-ibm-plex-serif",
  display: "swap",
});

// Open Sans for general text
const openSans = localFont({
  src: [
    {
      path: "../../public/fonts/Open_Sans/static/OpenSans-Regular.ttf",
      weight: "400",
      style: "normal",
    },
    {
      path: "../../public/fonts/Open_Sans/static/OpenSans-SemiBold.ttf",
      weight: "600",
      style: "normal",
    },
    {
      path: "../../public/fonts/Open_Sans/static/OpenSans-Bold.ttf",
      weight: "700",
      style: "normal",
    },
  ],
  variable: "--font-open-sans",
  display: "swap",
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
        className={`${geistSans.variable} ${geistMono.variable} ${mina.variable} ${ibmPlexSerif.variable} ${openSans.variable} antialiased`}
      >
        <AuthProvider>
          {children}
        </AuthProvider>
      </body>
    </html>
  );
}
