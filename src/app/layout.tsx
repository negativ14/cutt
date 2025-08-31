import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import SessionProviderWrapper from "./providers/SessionProviderWrapper";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import QueryProvider from "./providers/QueryProvider";
import GoogleAnalytics from "@/components/GoogleAnalytic";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Cutt",
  description:
    "Cutt is a modern URL shortener that makes your links simple, trackable, and easy to share.",
  icons: {
    icon: "logo.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased -z-10`}
        style={{
          backgroundImage: `
        radial-gradient(circle at 20% 80%, rgba(255, 182, 153, 0.3) 0%, transparent 50%),
        radial-gradient(circle at 80% 20%, rgba(255, 244, 214, 0.5) 0%, transparent 50%),
        radial-gradient(circle at 40% 40%, rgba(255, 182, 153, 0.1) 0%, transparent 50%)`,
        }}
      >
        <SessionProviderWrapper>
          <QueryProvider>
            <Navbar />
            {children}
            <GoogleAnalytics />
            <Footer />
          </QueryProvider>
        </SessionProviderWrapper>
      </body>
    </html>
  );
}
