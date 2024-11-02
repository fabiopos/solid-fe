"use client";

import { useStore } from "zustand";
import { type ReactNode, createContext, useRef, useContext } from "react";
import {
    makePlayersStore,
  type PlayersStore,
} from "@/features/players/domain/usePlayersStore";

export type PlayersStoreApi = ReturnType<typeof makePlayersStore>;

export const PlayersStoreContext = createContext<PlayersStoreApi | undefined>(
  undefined
);

export interface PlayersStoreProviderProps {
  children: ReactNode;
}

export const PlayersStoreProvider = ({
  children,
}: PlayersStoreProviderProps) => {
  const storeRef = useRef<PlayersStoreApi>();
  if (!storeRef.current) {
    storeRef.current = makePlayersStore();
  }

  return (
    <PlayersStoreContext.Provider value={storeRef.current}>
      {children}
    </PlayersStoreContext.Provider>
  );
};

export const usePlayersStore = <T,>(
  selector: (store: PlayersStore) => T
): T => {
  const playersStoreContext = useContext(PlayersStoreContext);

  if (!playersStoreContext) {
    throw new Error(
      `usePlayersStore must be used within PlayersStoreProvider`
    );
  }

  return useStore(playersStoreContext, selector);
};
