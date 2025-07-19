import { Team } from "@/types/types.common";
import { StateCreator } from "zustand";
import { Store } from "@/types/store";

export type TeamState = {
  teams: Team[];
};

export type TeamActions = {
  addTeam: (team: Team) => void;
};

export type TeamSlice = TeamState & TeamActions;

const defaultState: TeamState = {
  teams: [],
};

export const createTeamSlice: StateCreator<
  Store,
  [["zustand/immer", never]],
  [],
  TeamSlice
> = (_set, _get) => ({
  ...defaultState,
  addTeam: (team) => {
    //set((state) => state.teams.push(team));
    console.log(team);
  },
});
