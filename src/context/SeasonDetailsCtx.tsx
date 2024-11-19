"use client";

import { useStore } from "zustand";
import { type ReactNode, createContext, useRef, useContext } from "react";
import {
  makeSeasonDetailsStore,
  type SeasonDetailsStore,
} from "@/features/seasons/domain/useSeasonDetailsStore";
import { FulfilledSeason } from "@/features/seasons/domain/season.schema";

export type SeasonStoreApi = ReturnType<typeof makeSeasonDetailsStore>;

export const SeasonDetailsStoreContext = createContext<SeasonStoreApi | undefined>(
  undefined
);

export interface SeasonStoreProviderProps {
  children: ReactNode;
  season: FulfilledSeason | null;
}

export const SeasonDetailStoreProvider = ({
  children,
  season,
}: SeasonStoreProviderProps) => {
  const storeRef = useRef<SeasonStoreApi>();
  if (!storeRef.current) {
    storeRef.current = makeSeasonDetailsStore({ season: season });
  }

  return (
    <SeasonDetailsStoreContext.Provider value={storeRef.current}>
      {children}
    </SeasonDetailsStoreContext.Provider>
  );
};

export const useSeasonDetailsStore = <T,>(selector: (store: SeasonDetailsStore) => T): T => {
  const seasonDetailsStoreContext = useContext(SeasonDetailsStoreContext);

  if (!seasonDetailsStoreContext) {
    throw new Error(`useSeasonDetailsStore must be used within SeasonDetailsStoreProvider`);
  }

  return useStore(seasonDetailsStoreContext, selector);
};
