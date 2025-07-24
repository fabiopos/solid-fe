import { decodeTeam, FulfilledTeam } from "@/features/teams/domain/team.schema";
import { FetchError, JsonError } from "@/services/http/errors/http.errors";
import { fetchRequest } from "@/services/http/program/http.program";
import { ParseError } from "@effect/schema/ParseResult";
import { Context, Effect } from "effect";

export interface TeamApiImpl {
  readonly getTeamById: (
    teamId: string
  ) => Effect.Effect<FulfilledTeam, FetchError | JsonError | ParseError, never>;

  //   readonly queryTeamInvite: ({
  //     tid,
  //     sid,
  //   }: {
  //     tid: string;
  //     sid: string;
  //   }) => Effect.Effect<
  //     FulfilledTeam,
  //     FetchError | JsonError | ParseError,
  //     never
  //   >;
}

export class TeamApi extends Context.Tag("TeamApi")<TeamApi, TeamApiImpl>() {
  static readonly Live = () =>
    TeamApi.of({
      getTeamById: (teamId: string) => {
        return Effect.gen(function* () {
          const endpoint = `/team/invite-validate`;

          const json = yield* fetchRequest({
            endpoint,
            options: {
              body: JSON.stringify({ id: teamId }),
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
            },
          });

          const team = yield* decodeTeam(json);

          return team;
        });
      },
    });
}
