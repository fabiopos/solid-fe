import { Effect } from "effect";
import { GetPWSParams, PlayerApi } from "./player.api";

const runnableGetPWS = ({ teamId }: GetPWSParams) =>
  Effect.gen(function* () {
    const playerApi = yield* PlayerApi;
    const program = playerApi.getPlayerWS(teamId);
    return yield* program;
  });

/**
 * GET all players with stats
 * @param params teamId and token
 * @returns FulfilledPlayerWithStatus[]
 */
export const getPWSByTeamId = (params: GetPWSParams) =>
  runnableGetPWS(params).pipe(
    Effect.provideService(PlayerApi, PlayerApi.Live({ token: params.token }))
  );
