import { StateCreator } from "zustand";
import { Store } from "@/types/store";
import { FulfilledPlayerWithStats } from "@/features/players/domain/player.effect.schema";
import { FulfilledFieldPosition } from "@/features/fieldPosition/domain/field-position.schema";

export type PlayerState = {
  players: FulfilledPlayerWithStats[];
  fieldPositions: FulfilledFieldPosition[];
  tab: string;
  onlyActive: boolean;
};

export type PlayerActions = {
  setPlayers: (players: FulfilledPlayerWithStats[]) => void;
  setFieldPositions: (fieldPositions: FulfilledFieldPosition[]) => void;
  setTab: (tab: string) => void;
  setOnlyActive: (onlyActive: boolean) => void;
};

export type PlayerSlice = PlayerState & PlayerActions;

const defaultState: PlayerState = {
  fieldPositions: [],
  players: [],
  tab: "all",
  onlyActive: false,
};

export const createPlayerSlice: StateCreator<
  Store,
  [["zustand/immer", never]],
  [],
  PlayerSlice
> = (set, _get) => ({
  ...defaultState,
  setFieldPositions: (fieldPositions) => set(() => ({ fieldPositions })),
  setPlayers: (players) => set(() => ({ players })),
  setTab: (tab) => set(() => ({ tab })),
  setOnlyActive: (onlyActive) => set(() => ({ onlyActive })),
});
