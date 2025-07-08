import { getCookieTeamId, setCookieTeamId } from "@/app/actions";
import { Team } from "@/types/types.common";
import { Context, Effect, pipe } from "effect";

export interface ITeamClient {
  _tag: "TeamClient";
  getTeams(token: string): Promise<Team[]>;
}

export const TeamClient = Context.Tag("@app/TeamClient")<
  ITeamClient,
  {
    _tag: "TeamClient";
    getTeams: (token: string) => Promise<Team[]>;
  }
>();

export function getTeamsEffect(token: string) {
  return pipe(
    TeamClient,
    Effect.flatMap((client) => Effect.tryPromise(() => client.getTeams(token))),
    Effect.catchAll((error) =>
      Effect.fail(new Error(`Failed to fetch teams: ${error.message}`))
    )
  );
}

export function getSelectedTeamId() {
  return pipe(
    Effect.tryPromise({
      try: () => getCookieTeamId(),
      catch: () => undefined,
    })
  );
}

export function getSelectedOrDefaultTeam(
  teams: Team[],
  selectedTeamId: string
) {
  return pipe(
    getTeamsCandidates(teams),
    Effect.map((candidates) => {
      if (selectedTeamId) {
        return findTeamById(candidates, selectedTeamId);
      }
      return candidates.length > 0 ? candidates[0] : undefined;
    })
  );
}

function findTeamById(teams: Team[], teamId: string) {
  return teams.find((team) => team.id === teamId);
}

function getTeamsCandidates(teams: Team[]) {
  return pipe(teams, (teams) =>
    Effect.succeed([...teams.filter((x) => x.active && x.hasSubscription)])
  );
}
