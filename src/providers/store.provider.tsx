"use client";
import { type ReactNode, createContext, useRef, useContext } from "react";
import { Store, StoreState } from "@/types/store";
import { createSolidStore } from "@/stores/store";
import { useStore } from "zustand";

export type StoreApi = ReturnType<typeof createSolidStore>;

export const StoreContext = createContext<StoreApi | undefined>(undefined);

export interface StoreProviderProps {
  children: ReactNode;
  initialState: Partial<StoreState>;
}

export const StoreProvider = ({
  children,
  initialState,
}: StoreProviderProps) => {
  const storeRef = useRef<StoreApi | null>(null);
  if (storeRef.current === null) {
    storeRef.current = createSolidStore(initialState);
  }

  return (
    <StoreContext.Provider value={storeRef.current}>
      {children}
    </StoreContext.Provider>
  );
};

export const useSolidStore = <T,>(selector: (store: Store) => T): T => {
  const counterStoreContext = useContext(StoreContext);

  if (!counterStoreContext) {
    throw new Error(`useCounterStore must be used within CounterStoreProvider`);
  }

  return useStore(counterStoreContext, selector);
};
