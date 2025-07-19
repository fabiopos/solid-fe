import { StateCreator } from "zustand";
import { Store } from "@/types/store";

export type SeasonState = {
  tree: never[];
};

export type SeasonActions = {
  updateTree: (tree: unknown) => void;
};

export type SeasonSlice = SeasonState & SeasonActions;

const defaultState: SeasonState = {
  tree: [],
};

export const createSeasonSlice: StateCreator<
  Store,
  [["zustand/immer", never]],
  [],
  SeasonSlice
> = (_set, _get) => ({
  ...defaultState,
  updateTree: (tree) => {
    //set((state) => state.tree)
    console.log(tree);
  },
});
