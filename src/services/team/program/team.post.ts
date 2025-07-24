import { Effect } from "effect";
import { TeamApi } from "./team.api";

const runnableValidateTeamInvide = (params: { teamId: string }) =>
  Effect.gen(function* () {
    const teamApi = yield* TeamApi;
    const program = teamApi.getTeamById(params.teamId);
    return yield* program;
  });

export const validateTeamInvite = (params: { teamId: string }) =>
  runnableValidateTeamInvide(params).pipe(
    Effect.provideService(TeamApi, TeamApi.Live())
  );

const runnableQueryTeamInvite = (params: { tid: string; sid: string }) =>
  Effect.gen(function* () {
    const teamApi = yield* TeamApi;
    const program = teamApi.getTeamById(params.tid);
    return yield* program;
  });

export const queryTeamInvite = (params: { tid: string; sid: string }) =>
  runnableQueryTeamInvite(params).pipe(
    Effect.provideService(TeamApi, TeamApi.Live())
  );
