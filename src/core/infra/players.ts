import { FulfilledPlayerWithStats } from "@/features/players/domain/player.effect.schema";
import { Context, Effect, Redacted } from "effect";
import { Data } from "effect";
import {
  FetchHttpClient,
  HttpClient,
  HttpClientRequest,
} from "@effect/platform";

export class PlayersGetError extends Data.TaggedError("PlayersGetError")<{
  readonly message: string;
}> {}

export type PlayerGetParams = {
  readonly endpoint: string;
  readonly token: string;
};

export interface PlayerGetShape {
  readonly getAllWithStats: (
    params: PlayerGetParams
  ) => Effect.Effect<FulfilledPlayerWithStats, PlayersGetError>;
}

export class PlayerGetService extends Context.Tag("app/players/get")<
  PlayerGetService,
  PlayerGetShape
>() {}

export const main = Effect.gen(function* () {
  const playerGetService = yield* PlayerGetService;
  return playerGetService.getAllWithStats;
});

export const GetEndpointParams = (endpoint: string, token: string) =>
  Effect.succeed({
    endpoint,
    token,
  });

export const program = (params: PlayerGetParams) =>
  Effect.gen(function* () {
    // Access HttpClient
    const client = yield* HttpClient.HttpClient;

    // Create and execute a GET request
    const response = yield* client
      .get(params.endpoint)
      .pipe(HttpClientRequest.bearerToken(Redacted.make(params.token)));

    const json = yield* response.json;

    console.log(json);
  }).pipe(
    // Provide the HttpClient
    Effect.provide(FetchHttpClient.layer)
  );
Effect.runPromise(
  main.pipe(
    Effect.provideService(PlayerGetService, {
      getAllWithStats: (params: PlayerGetParams) => {
        // Simulate fetching players with stats
      },
    })
  )
);
