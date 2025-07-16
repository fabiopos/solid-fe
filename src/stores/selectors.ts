import { StoreState } from "@/types/store";
import { createSelector } from "reselect";

export const selectTeams = (state: StoreState) => state.teams;
export const selectSelectedTeamId = (state: StoreState) => state.selectedTeamId;
export const selectTree = (state: StoreState) => state.tree as never[];

export const selectMyTeams = createSelector([selectTeams], (teams) =>
  teams.filter((x) => x.hasSubscription)
);

export const selectMyRivals = createSelector([selectTeams], (teams) =>
  teams.filter((x) => !x.hasSubscription)
);

export const selectSelectedTeam = createSelector(
  [selectTeams, selectSelectedTeamId],
  (teams, selectedTeamId) => teams.find((x) => x.id === selectedTeamId)
);
