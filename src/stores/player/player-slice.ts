import { StateCreator } from "zustand";
import { Store } from "@/types/store";
import { FulfilledPlayerWithStats } from "@/features/players/domain/player.effect.schema";
import { FulfilledFieldPosition } from "@/features/fieldPosition/domain/field-position.schema";

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
    set(() => ({
      selectedPlayer: {
        ...player,
        favPositionId,
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
});
