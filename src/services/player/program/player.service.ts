import { decodePWS } from "@/features/players/domain/player.effect.schema";
import { fetchRequest } from "@/services/http/program/http.program";
import { Effect, pipe } from "effect";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const parsePlayers = (players: any) => {
  return pipe(
    players,
    Effect.map((a) => a as unknown[]),
    Effect.forEach((a) => decodePWS({ ...a, _tag: "FulfilledPlayerWithStats" }))
  );
};

export const getAllPlayersWS = Effect.gen(function* () {
  const resource = "/player/${teamId}/with-stats/active";
  const players = yield* fetchRequest(resource);

  const decoded = yield* parsePlayers(players);

  return decoded;
});
