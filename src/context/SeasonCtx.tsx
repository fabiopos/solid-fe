"use client";

import { useStore } from "zustand";
import { type ReactNode, createContext, useRef, useContext } from "react";
import {
  makeSeasonStore,
  type SeasonStore,
} from "@/features/seasons/domain/useSeasonStore";
import { FulfilledSeason } from "@/features/seasons/domain/season.schema";

export type SeasonStoreApi = ReturnType<typeof makeSeasonStore>;

export const SeasonStoreContext = createContext<SeasonStoreApi | undefined>(
  undefined
);

export interface SeasonStoreProviderProps {
  children: ReactNode;
  seasons: FulfilledSeason[];
}

export const SeasonStoreProvider = ({
  children,
  seasons,
}: SeasonStoreProviderProps) => {
  const storeRef = useRef<SeasonStoreApi>();
  if (!storeRef.current) {
    storeRef.current = makeSeasonStore({ seasons: seasons });    
  }

  return (
    <SeasonStoreContext.Provider value={storeRef.current}>
      {children}
    </SeasonStoreContext.Provider>
  );
};

export const useSeasonStore = <T,>(selector: (store: SeasonStore) => T): T => {
  const seasonStoreContext = useContext(SeasonStoreContext);

  if (!seasonStoreContext) {
    throw new Error(`useSeasonStore must be used within SeasonStoreProvider`);
  }

  return useStore(seasonStoreContext, selector);
};
