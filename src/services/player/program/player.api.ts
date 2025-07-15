/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  decodePWS,
  encodePWS,
  FulfilledPlayerWithStats,
} from "@/features/players/domain/player.effect.schema";
import { FetchError, JsonError } from "@/services/http/errors/http.errors";
import { fetchRequest } from "@/services/http/program/http.program";
import { ParseError } from "@effect/schema/ParseResult";
import { Context, Effect, pipe } from "effect";
import { isArray } from "effect/Array";
import { ConfigError } from "effect/ConfigError";

interface PlayerApiImpl {
  readonly getPlayerWS: Effect.Effect<
    FulfilledPlayerWithStats[],
    FetchError | JsonError | ParseError | ConfigError,
    never
  >;
}

const parseJson = (players: any): Effect.Effect<unknown[], JsonError> => {
  return pipe(
    players,
    isArray,
    Effect.if({
      onFalse: () => Effect.fail(new JsonError()),
      onTrue: () => Effect.succeed(players as unknown[]),
    })
  );
};

export class PlayerApi extends Context.Tag("PlayerApi")<
  PlayerApi,
  PlayerApiImpl
>() {
  static readonly Live = (teamId: string) =>
    PlayerApi.of({
      getPlayerWS: Effect.gen(function* () {
        const resource = `/player/${teamId}/with-stats`;

        const json = yield* fetchRequest(resource);

        const players = yield* parseJson(json);

        const pws = yield* Effect.forEach((a) => decodePWS(a))(players);

        const encodedPWS = yield* Effect.forEach((a) => encodePWS(a))(pws);

        return encodedPWS as FulfilledPlayerWithStats[];
      }),
    });
}
