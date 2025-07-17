import { FulfilledPlayerWithStats } from "@/features/players/domain/player.effect.schema";
import { StoreState } from "@/types/store";
import { createSelector } from "reselect";

export const selectTeams = (state: StoreState) => state.teams;
export const selectSelectedTeamId = (state: StoreState) => state.selectedTeamId;
export const selectTree = (state: StoreState) => state.tree as never[];
export const selectUser = (state: StoreState) => state.user;
export const selectPlayers = (state: StoreState) => state.players;
export const selectFieldPositions = (state: StoreState) => state.fieldPositions;

export const selectAccessToken = createSelector(
  [selectUser],
  (user) => user?.access_token
);

export const selectActiveTab = (state: StoreState) => state.tab;
export const selectOnlyActive = (state: StoreState) => state.onlyActive;

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

export const selectActivePlayers = createSelector([selectPlayers], (players) =>
  players.filter((x) => x.active)
);

export const selectInactivePlayers = createSelector(
  [selectPlayers],
  (players) => players.filter((x) => !x.active)
);

export const selectPlayersByStatus = createSelector(
  [selectPlayers, selectOnlyActive],
  (players, onlyActive) => players.filter((x) => x.active === onlyActive)
);

export const selectFieldPositionCategories = createSelector(
  [selectFieldPositions],
  (fieldPositions) => {
    const categories = fieldPositions
      .map((x) => x.category)
      .filter((x) => x)
      .map((x) => String(x));

    return [...new Set(categories)];
  }
);

type PlayerCat = Record<string, FulfilledPlayerWithStats[]>;

export const selectPlayersInCategory = createSelector(
  [selectFieldPositionCategories, selectPlayers],
  (categories, players) =>
    categories.reduce(
      (acc, category) => ({
        ...acc,
        [category]: players.filter(
          (player) =>
            player.favPosition?.category === category ||
            (player.playerPositions ?? []).some(
              (pos) => pos.fieldPosition?.category === category
            )
        ),
      }),
      {}
    ) as PlayerCat
);

export const selectPlayersInCategoryByStatus = createSelector(
  [selectPlayersInCategory, selectOnlyActive, selectActiveTab],
  (players, onlyActive, tab) =>
    (players[tab] ?? []).filter((x) => x.active === onlyActive)
);

export const selectCategoriesCount = createSelector(
  [selectFieldPositionCategories, selectPlayersInCategory],
  (categories, players) => {
    return categories.map((c) => ({
      name: c,
      count: players[c].length ?? 0,
    }));
  }
);
