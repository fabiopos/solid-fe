"use client";

import { useStore } from "zustand";
import { type ReactNode, createContext, useRef, useContext } from "react";
import {
  makePlayersStore,
  type PlayersStore,
} from "@/features/players/domain/usePlayersStore";
import { FulfilledPlayer } from "@/features/players/domain/player.effect.schema";
import { FulfilledFieldPosition } from "@/features/fieldPosition/domain/field-position.schema";

export type PlayersStoreApi = ReturnType<typeof makePlayersStore>;

export const PlayersStoreContext = createContext<PlayersStoreApi | undefined>(
  undefined
);

export interface PlayersStoreProviderProps {
  children: ReactNode;
  players: FulfilledPlayer[];
  fieldPositions: FulfilledFieldPosition[];
}

export const PlayersStoreProvider = ({
  players,
  fieldPositions,
  children,
}: PlayersStoreProviderProps) => {
  const storeRef = useRef<PlayersStoreApi>();
  if (!storeRef.current) {
    storeRef.current = makePlayersStore({
      players,
      error: null,
      fetchPlayersStatus: "IDLE",
      playerStatusDelete: { id: null, status: "IDLE" },
      playerStatusUpdate: { id: null, status: "IDLE" },
      allFieldPositions: fieldPositions,
      selectedPlayer: null,
    });
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
    throw new Error(`usePlayersStore must be used within PlayersStoreProvider`);
  }

  return useStore(playersStoreContext, selector);
};
