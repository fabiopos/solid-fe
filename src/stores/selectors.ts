import { FulfilledPlayerWithStats } from "@/features/players/domain/player.effect.schema";
import { StoreState } from "@/types/store";
import { Match } from "effect";
import { createSelector } from "reselect";
import * as R from "rambdax";

export const selectTeams = (state: StoreState) => state.teams;
export const selectSelectedTeamId = (state: StoreState) => state.selectedTeamId;
export const selectTree = (state: StoreState) => state.tree as never[];
export const selectUser = (state: StoreState) => state.user;
export const selectPlayers = (state: StoreState) => state.players;
export const selectFieldPositions = (state: StoreState) => state.fieldPositions;
export const selectSelectedPlayer = (state: StoreState) => state.selectedPlayer;
export const selectNewPlayerInvite = (state: StoreState) => state.newPlayer;

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
  [selectFieldPositionCategories, selectPlayersInCategory, selectOnlyActive],
  (categories, players, onlyActive) => {
    return categories.map((c) => ({
      name: c,
      count: players[c].filter((x) => x.active === onlyActive).length ?? 0,
    }));
  }
);

export const selectSelectedPlayerPositions = createSelector(
  [selectSelectedPlayer],
  (selectedPlayer) =>
    selectedPlayer
      ? (selectedPlayer.playerPositions ?? []).map(
          (x) => x.fieldPosition?.id ?? ""
        )
      : []
);

export const selectNewPlayerInviteStep = (state: StoreState) => state.step;

export const selectCanContinuePlayerInvite = createSelector(
  [selectNewPlayerInvite, selectNewPlayerInviteStep],
  (newPlayer, step) => {
    return Match.value(step).pipe(
      Match.when(1, () => {
        return R.allTrue(
          R.isNotEmpty(newPlayer?.avatarUrl),
          R.isNotEmpty(newPlayer?.firstName),
          R.isNotEmpty(newPlayer?.lastName),
          R.isNotEmpty(newPlayer?.birthDate),
          R.isNotEmpty(newPlayer?.country),
          R.isNotEmpty(newPlayer?.documentNumber),
          R.isNotEmpty(newPlayer?.documentType),
          R.isNotEmpty(newPlayer?.email),
          R.isNotEmpty(newPlayer?.city),
          R.isNotEmpty(newPlayer?.phone)
        );
      }),
      Match.when(2, () =>
        R.allTrue(
          R.isNotEmpty(newPlayer?.nameOnShirt),
          R.isNotEmpty(newPlayer?.shirtNumber),
          R.isNotEmpty(newPlayer?.favPositionId),
          R.isNotEmpty(newPlayer?.height),
          R.isNotEmpty(newPlayer?.weight),
          R.isNotEmpty(newPlayer?.healthProvider),
          R.isNotEmpty(newPlayer?.riskInsurance)
        )
      ),
      Match.orElse(() => true)
    );
  }
);
