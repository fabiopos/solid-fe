"use client";

import { FulfilledMatchAparition } from "@/features/aparition/domain/aparition.schema";
import { FulfilledMatch } from "@/features/match/domain/match.schema";
import {
  makeMatchDetailsStore,
  MatchDetailsStore,
} from "@/features/match/domain/useMatchDetails";
import { createContext, ReactNode, useContext, useRef } from "react";
import { useStore } from "zustand";

export type MatchDetailsStoreApi = ReturnType<typeof makeMatchDetailsStore>;

export const MatchDetailsStoreContext = createContext<
  MatchDetailsStoreApi | undefined
>(undefined);

export interface MatchDetailsStoreProviderProps {
  children: ReactNode;
  match: FulfilledMatch | null;
  aparitions: FulfilledMatchAparition[];
}

export const MatchDetailsStoreProvider = ({
  children,
  match,
  aparitions,
}: MatchDetailsStoreProviderProps) => {
  const storeRef = useRef<MatchDetailsStoreApi>();
  if (!storeRef.current) {
    storeRef.current = makeMatchDetailsStore({
      match,
      aparitions,
    });
  }

  return (
    <MatchDetailsStoreContext.Provider value={storeRef.current}>
      {children}
    </MatchDetailsStoreContext.Provider>
  );
};

export const useMatchDetailsStore = <T,>(
  selector: (store: MatchDetailsStore) => T
): T => {
  const matchDetailsStoreContext = useContext(MatchDetailsStoreContext);

  if (!matchDetailsStoreContext) {
    throw new Error(
      `useMatchDetailsStore must be used within MatchDetailsStoreContext.Provider`
    );
  }

  return useStore(matchDetailsStoreContext, selector);
};
