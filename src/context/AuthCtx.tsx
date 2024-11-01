"use client";

import { useStore } from "zustand";
import { type ReactNode, createContext, useRef, useContext } from "react";
import {
  makeAuthStore,
  type AuthCreateStore,
} from "@/features/auth/domain/useAuthStore";

export type AuthStoreApi = ReturnType<typeof makeAuthStore>;

export const AuthStoreStoreContext = createContext<AuthStoreApi | undefined>(
  undefined
);

export interface AuthStoreProviderProps {
  children: ReactNode;
}

export const AuthStoreProvider = ({
  children,
}: AuthStoreProviderProps) => {
  const storeRef = useRef<AuthStoreApi>();
  if (!storeRef.current) {
    storeRef.current = makeAuthStore();
  }

  return (
    <AuthStoreStoreContext.Provider value={storeRef.current}>
      {children}
    </AuthStoreStoreContext.Provider>
  );
};

export const useAuthStore = <T,>(
  selector: (store: AuthCreateStore) => T
): T => {
  const authStoreContext = useContext(AuthStoreStoreContext);

  if (!authStoreContext) {
    throw new Error(
      `useAuthStore must be used within SubscriptionCreateStoreProvider`
    );
  }

  return useStore(authStoreContext, selector);
};
