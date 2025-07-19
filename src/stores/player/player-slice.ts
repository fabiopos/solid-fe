import { StateCreator } from "zustand";
import { Store } from "@/types/store";
import { FulfilledPlayerWithStats } from "@/features/players/domain/player.effect.schema";
import { FulfilledFieldPosition } from "@/features/fieldPosition/domain/field-position.schema";
import { PlayerStatus } from "@/types/types.common";

export type PlayerState = {
  players: FulfilledPlayerWithStats[];
  fieldPositions: FulfilledFieldPosition[];
  tab: string;
  onlyActive: boolean;
  selectedPlayer: FulfilledPlayerWithStats | null;
};

export type PlayerActions = {
  setPlayers: (players: FulfilledPlayerWithStats[]) => void;
  setFieldPositions: (fieldPositions: FulfilledFieldPosition[]) => void;
  setTab: (tab: string) => void;
  setOnlyActive: (onlyActive: boolean) => void;
  setSelectedPlayer: (player: FulfilledPlayerWithStats | null) => void;
  setSelectedPlayerPositions: (fieldPositionsIds: string[]) => void;
  setFavPosition: (favPositionId: string) => void;
  syncSelectedPlayerChanges: () => void;
  setPlayerStatus: (playerId: string, playerStatus: PlayerStatus) => void;
  setPlayerInactive: (playerId: string, active: boolean) => void;
  setPlayerDelete: (playerId: string) => void;
};

export type PlayerSlice = PlayerState & PlayerActions;

const defaultState: PlayerState = {
  fieldPositions: [],
  players: [],
  tab: "all",
  onlyActive: false,
  selectedPlayer: null,
};

export const createPlayerSlice: StateCreator<
  Store,
  [["zustand/immer", never]],
  [],
  PlayerSlice
> = (set, get) => ({
  ...defaultState,
  setFieldPositions: (fieldPositions) => set(() => ({ fieldPositions })),
  setPlayers: (players) => set(() => ({ players })),
  setTab: (tab) => set(() => ({ tab })),
  setOnlyActive: (onlyActive) => set(() => ({ onlyActive })),
  setSelectedPlayer: (player) => set(() => ({ selectedPlayer: player })),
  setSelectedPlayerPositions: (fieldPositionsIds) => {
    const selectedPlyr = get().selectedPlayer;
    if (selectedPlyr === null) return;
    set((state) => ({
      selectedPlayer: {
        ...state.selectedPlayer,
        playerPositions: fieldPositionsIds.map((x) => ({
          fieldPosition: { id: FulfilledFieldPosition.make({ id: x }).id },
        })),
      },
    }));
  },
  setFavPosition(favPositionId: string) {
    const player = get().selectedPlayer;
    if (!player) return;
    set((state) => ({
      selectedPlayer: {
        ...player,
        favPositionId,
        favPosition:
          state.fieldPositions.find((fp) => fp.id === favPositionId) ?? null,
      },
    }));
  },
  syncSelectedPlayerChanges() {
    set((state) => {
      return {
        players: state.players.map((p) => {
          if (p.id === state.selectedPlayer?.id) return state.selectedPlayer;
          return p;
        }),
      };
    });
  },
  setPlayerStatus: (playerId: string, playerStatus: PlayerStatus) => {
    set((state) => ({
      players: state.players.map((player) =>
        player.id === playerId ? { ...player, status: playerStatus } : player
      ),
    }));
  },
  setPlayerInactive(playerId: string, active: boolean) {
    const players = get().players;

    set(() => ({
      players: players.map((p) => {
        if (p.id === playerId) return { ...p, active };
        return p;
      }),
    }));
  },
  setPlayerDelete(playerId: string) {
    set((state) => ({
      players: state.players.filter((p) => p.id !== playerId),
    }));
  },
});
