import {
  decodePWS,
  encodePWS,
  FulfilledPlayerWithStats,
} from "@/features/players/domain/player.effect.schema";
import { FetchError, JsonError } from "@/services/http/errors/http.errors";
import { fetchRequest } from "@/services/http/program/http.program";
import { ParseError } from "@effect/schema/ParseResult";
import { Context, Effect } from "effect";
import { ConfigError } from "effect/ConfigError";
import { parseJson } from "../common";

interface PlayerApiImpl {
  readonly getPlayerWS: Effect.Effect<
    FulfilledPlayerWithStats[],
    FetchError | JsonError | ParseError | ConfigError,
    never
  >;
}

export class PlayerApi extends Context.Tag("PlayerApi")<
  PlayerApi,
  PlayerApiImpl
>() {
  static readonly Live = (teamId: string) =>
    PlayerApi.of({
      getPlayerWS: Effect.gen(function* () {
        const endpoint = `/player/${teamId}/with-stats`;

        const json = yield* fetchRequest({ endpoint });

        const players = yield* parseJson(json);

        const pws = yield* Effect.forEach((a) => decodePWS(a))(players);

        const encodedPWS = yield* Effect.forEach((a) => encodePWS(a))(pws);

        return encodedPWS as FulfilledPlayerWithStats[];
      }),
    });
}
