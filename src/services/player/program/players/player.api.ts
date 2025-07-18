import {
  decodePWS,
  encodePWS,
  FulfilledPlayerWithStats,
} from "@/features/players/domain/player.effect.schema";
import { FetchError, JsonError } from "@/services/http/errors/http.errors";
import {
  fetchReq,
  fetchRequest,
  getDefaultOptions,
} from "@/services/http/program/http.program";
import { ParseError } from "@effect/schema/ParseResult";
import { Context, Effect } from "effect";
import { ConfigError } from "effect/ConfigError";
import { parseJson } from "../common";

export type GetPWSParams = {
  teamId: string;
  token: string;
};

export type PlayerApiLiveParams = {
  token?: string;
};

export type UpdateFieldPositionsParams = {
  pid: string;
  body: { favPosition: string; fieldPositions: string[] };
};

interface PlayerApiImpl {
  readonly getPlayerWS: (
    teamId: string
  ) => Effect.Effect<
    FulfilledPlayerWithStats[],
    FetchError | JsonError | ParseError | ConfigError,
    never
  >;
  readonly updateFieldPositions: (
    params: UpdateFieldPositionsParams
  ) => Effect.Effect<
    void,
    FetchError | JsonError | ParseError | ConfigError,
    never
  >;
}

export class PlayerApi extends Context.Tag("PlayerApi")<
  PlayerApi,
  PlayerApiImpl
>() {
  static readonly Live = (liveParams: PlayerApiLiveParams) =>
    PlayerApi.of({
      getPlayerWS: (teamId) =>
        Effect.gen(function* () {
          const endpoint = `/player/${teamId}/with-stats`;

          const json = yield* fetchRequest({ endpoint });

          const players = yield* parseJson(json);

          const pws = yield* Effect.forEach((a) => decodePWS(a))(players);

          const encodedPWS = yield* Effect.forEach((a) => encodePWS(a))(pws);

          return encodedPWS as FulfilledPlayerWithStats[];
        }),
      updateFieldPositions: (req) =>
        Effect.gen(function* () {
          const endpoint = `/player/${req.pid}/field-positions`;
          const options = yield* getDefaultOptions("PATCH", liveParams.token);
          options.body = JSON.stringify(req.body);
          const response = yield* fetchReq({ endpoint, options });
          if (!response.ok) {
            return yield* new FetchError();
          }
        }),
    });
}
