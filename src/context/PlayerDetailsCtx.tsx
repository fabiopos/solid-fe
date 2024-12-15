"use client";

import { FulfilledPlayer } from "@/features/players/domain/player.effect.schema";
import { makePlayerDeailsStore, PlayerDetailStore } from "@/features/players/domain/usePlayerDetailsStore";

import { createContext, ReactNode, useContext, useRef } from "react";
import { useStore } from "zustand";

export type PlayerDetailsStoreApi = ReturnType<typeof makePlayerDeailsStore>;

export const PlayerDetailsStoreContext = createContext<
  PlayerDetailsStoreApi | undefined
>(undefined);

export interface PlayerDetailsStoreProviderProps {
  children: ReactNode;
  player: FulfilledPlayer | null;
}

export const PlayerDetailsStoreProvider = ({
  children,
  player,
}: PlayerDetailsStoreProviderProps) => {
  const storeRef = useRef<PlayerDetailsStoreApi>();
  if (!storeRef.current) {
    storeRef.current = makePlayerDeailsStore({
      error: null,
      player,
      updateRequestStatus: "IDLE",
    });
  }

  return (
    <PlayerDetailsStoreContext.Provider value={storeRef.current}>
      {children}
    </PlayerDetailsStoreContext.Provider>
  );
};

export const usePlayerDetailsStore = <T,>(selector: (store: PlayerDetailStore) => T): T => {
  const playerDetailsStoreContext = useContext(PlayerDetailsStoreContext);

  if (!playerDetailsStoreContext) {
    throw new Error(`usePlayerDetailsStore must be used within PlayerDetailsStoreProvider`);
  }

  return useStore(playerDetailsStoreContext, selector);
};
