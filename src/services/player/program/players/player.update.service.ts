import { Effect } from "effect";
import {
  PATCHPlayerParams,
  PlayerApi,
  UpdateFieldPositionsParams,
} from "./player.api";

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

// update player
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
