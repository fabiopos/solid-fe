"use client";
import { SessionProvider } from "next-auth/react";
import { AuthStoreProvider } from "./AuthCtx";

interface Props {
  children: React.ReactNode;
}

function Providers({ children }: Props) {
  return (
    <SessionProvider>
      <AuthStoreProvider>{children}</AuthStoreProvider>
    </SessionProvider>
  );
}

export default Providers;
