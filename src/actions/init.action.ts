import { Team } from "@/types/types.common";
import { Effect, pipe, Schedule } from "effect";
import { getToken } from "./dashboard.actions";
import { getCookieTeamId } from "@/app/actions";
import { get } from "http";
import { ApiClient } from "@/lib/ApiClient";
import { TeamGet } from "@/features/teams/application/TeamGet";
import { SeasonGet } from "@/features/seasons/application/SeasonGet";
import { getTokenRetry } from "@/core/infra/auth";
import { PrivateLayoutData } from "@/types/layout.types";
import {
  getSelectedOrDefaultTeam,
  getSelectedTeamId,
  getTeamsEffect,
  TeamClient,
  type ITeamClient,
} from "@/core/infra/teams";

export function getInitialData() {
  return pipe(
    getTokenRetry(),
    Effect.flatMap(getData),
    Effect.catchAll((error) =>
      Effect.fail(new Error(`Failed to initialize data: ${error?.message}`))
    )
  );
}

function getData(token: string) {
  const apiClient = new ApiClient();
  const teamClient = new TeamGet(apiClient);
  return pipe(
    getTeamsEffect(token),
    Effect.flatMap(mapTeamsData),
    Effect.flatMap((payload) => getTreeData(payload, token))
  ).pipe(
    Effect.provideService(TeamClient, {
      _tag: "TeamClient",
      getTeams: (token: string) => teamClient.getTeams(token),
    })
  );
}

function mapTeamsData(teams: Team[]) {
  return pipe(
    getSelectedTeamId(),
    Effect.map((selectedTeamId) =>
      getSelectedOrDefaultTeam(teams, selectedTeamId ?? "")
    ),
    Effect.flatten,
    Effect.map(
      (selectedTeam) =>
        ({
          teams,
          tree: [],
          isTeamSelected: !!selectedTeam,
          selectedTeam,
          selectedTeamId: selectedTeam?.id,
          error: undefined,
        } as PrivateLayoutData)
    )
  );
}

function getTreeData(payload: PrivateLayoutData, token: string) {
  const apiClient = new ApiClient();
  return pipe(
    Effect.tryPromise(() =>
      getSeasonTree(apiClient, payload.selectedTeam?.id ?? "", token)
    ),
    Effect.map(
      (tree) =>
        ({
          ...payload,
          tree,
        } as PrivateLayoutData)
    )
  );
}

function getSeasonTree(apiClient: ApiClient, teamId: string, token: string) {
  const seasonClient = new SeasonGet(apiClient);
  return seasonClient.getSeasonTree(teamId, token);
}
