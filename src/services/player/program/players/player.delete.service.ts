import { Effect } from "effect";
import { DELETEPlayerParams, PlayerApi } from "./player.api";

// delete player
const runnableDeletePlayer = (params: DELETEPlayerParams) =>
  Effect.gen(function* () {
    const playerApi = yield* PlayerApi;
    const program = playerApi.deletePlayer(params);
    return yield* program;
  });

export const deletePlayer = (params: DELETEPlayerParams) =>
  runnableDeletePlayer(params).pipe(
    Effect.provideService(PlayerApi, PlayerApi.Live({ token: params.token }))
  );
