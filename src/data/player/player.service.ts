import {
  FetchError,
  JsonError,
  NoSessionError,
  NoTeamIdError,
  NoTokenError,
} from "@/entities/errors/errors.entity";
import {
  decodePWSArray,
  encodePWSArray,
  FulfilledPlayerWithStats,
} from "@/features/players/domain/player.effect.schema";
import { Console, Context, Effect } from "effect";
import { ConfigService } from "../config/config.service";
import { FetchService } from "../fetch/fetch.service";
import { SessionService } from "../session/session.service";
import { ParseError } from "@effect/schema/ParseResult";

export class PlayerService extends Context.Tag("PlayerService")<
  PlayerService,
  {
    readonly getPlayers: () => Effect.Effect<
      FulfilledPlayerWithStats[],
      | FetchError
      | JsonError
      | NoSessionError
      | NoTeamIdError
      | ParseError
      | NoTokenError,
      ConfigService | FetchService | SessionService
    >;
  }
>() {}

export const playerService = PlayerService.of({
  getPlayers: () =>
    Effect.gen(function* () {
      yield* Console.log("tid, token");
      const configService = yield* ConfigService;
      const { player } = yield* configService.getConfig;

      const sessionService = yield* SessionService;

      const tid = yield* sessionService.getTid();
      const token = yield* sessionService.getToken();

      const { endpoint, method } = player.getPlayerGetEndpoint(tid);

      const fetchService = yield* FetchService;
      const headers = yield* fetchService.getHeaders(token);

      const response = yield* fetchService.fetch({
        url: `${endpoint}`,
        init: { method, headers },
      });

      if (!response.ok)
        yield* Effect.fail(new FetchError({ message: response.statusText }));

      const json = yield* fetchService.getJson(response);

      const result = yield* decodePWSArray(json as unknown[]);

      const encoded = yield* encodePWSArray(result);

      return encoded as FulfilledPlayerWithStats[];
    }),
});
