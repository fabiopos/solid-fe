"use client";

import { FulfilledMatchAparition } from "@/features/aparition/domain/aparition.schema";
import { FulfilledMatch } from "@/features/match/domain/match.schema";
import {
  makeMatchDetailsStore,
  MatchDetailsStore,
} from "@/features/match/domain/useMatchDetails";
import { FulfilledPlayer } from "@/features/players/domain/player.effect.schema";
import { PlayerType } from "@/features/players/domain/player.schema";
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
  players: { homeTeamPlayers: FulfilledPlayer[]; awayTeamPlayers: FulfilledPlayer[] };
  teamId: string | undefined;
}

export const MatchDetailsStoreProvider = ({
  children,
  match,
  aparitions,
  players,
  teamId,
}: MatchDetailsStoreProviderProps) => {
  const storeRef = useRef<MatchDetailsStoreApi>();
  if (!storeRef.current) {
    const allPlayers = [...players.awayTeamPlayers, ...players.homeTeamPlayers];
    const myTeamPlayers = allPlayers.filter((x) => x.team?.id === teamId);
    const builtAparitions = buildAparitions(
      myTeamPlayers,
      aparitions,
      match?.id
    );
    storeRef.current = makeMatchDetailsStore({
      match,
      aparitions: builtAparitions,
      players: myTeamPlayers as FulfilledPlayer[],
    });
  }

  return (
    <MatchDetailsStoreContext.Provider value={storeRef.current}>
      {children}
    </MatchDetailsStoreContext.Provider>
  );
};

function buildAparitions(
  players: FulfilledPlayer[],
  aparitions: FulfilledMatchAparition[],
  matchId?: string | null
) {
  if (aparitions.length > 0) return aparitions;
  if (!matchId) return aparitions;

  const builtAparitions: FulfilledMatchAparition[] = [...players].map(
    (player) =>
      FulfilledMatchAparition.make({
        confirmed: false,
        played: false,
        minutes: 0,
        goals: 0,
        playerId: player.id,
        yellowCards: 0,
        redCards: 0,
        rating: 6,
        player: {
          id: player.id,
          firstName: player.firstName,
          lastName: player.lastName,
        },
        match: { id: matchId },
        matchId: matchId,
      })
  );

  return builtAparitions;
}

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
