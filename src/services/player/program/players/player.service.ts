import { Effect } from "effect";
import {
  GetPWSParams,
  PATCHPlayerParams,
  PlayerApi,
  UpdateFieldPositionsParams,
} from "./player.api";

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

/// update field positions
const runnablePatchPFP = (
  params: UpdateFieldPositionsParams & { token?: string }
) =>
  Effect.gen(function* () {
    const playerApi = yield* PlayerApi;
    const program = playerApi.updateFieldPositions(params);
    return yield* program;
  });

export const updatePlayerPositions = (
  params: UpdateFieldPositionsParams & { token?: string }
) =>
  runnablePatchPFP(params).pipe(
    Effect.provideService(PlayerApi, PlayerApi.Live({ token: params.token }))
  );

const runnablePatchPlayer = (params: PATCHPlayerParams) =>
  Effect.gen(function* () {
    const playerApi = yield* PlayerApi;
    const program = playerApi.updatePlayer(params);
    return yield* program;
  });

export const updatePlayer = (params: PATCHPlayerParams) =>
  runnablePatchPlayer(params).pipe(
    Effect.provideService(PlayerApi, PlayerApi.Live({ token: params.token }))
  );
