"use client";

import { SessionProvider } from "next-auth/react";
import { Toaster } from "sonner";

export default function SessionProviderWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <SessionProvider>
      <Toaster
        position="bottom-right"
        duration={3000}
        expand={true}
        visibleToasts={2}
      />
      {children}
    </SessionProvider>
  );
}
