import { Effect } from "effect";
import { PlayerApi } from "./player.api";

const program = Effect.gen(function* () {
  const playerApi = yield* PlayerApi;
  return yield* playerApi.getPlayerWS;
});

export const runnable = (teamId: string) =>
  program.pipe(Effect.provideService(PlayerApi, PlayerApi.Live(teamId)));

export const getPWSByTeamId = (teamId: string) => runnable(teamId);
