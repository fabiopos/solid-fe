import {
  FetchError,
  JsonError,
  NoSessionError,
  NoTeamIdError,
} from "@/entities/errors/errors.entity";
import {
  decodeFFM,
  decodeFFMArray,
  encodeFFM,
  FulfilledMatch,
} from "@/features/match/domain/match.schema";
import { Context, Effect } from "effect";
import { FetchService } from "../fetch/fetch.service";
import { ConfigService } from "../config/config.service";
import { SessionService } from "../session/session.service";
import { ParseError } from "@effect/schema/ParseResult";
import {
  decodeFFMAArray,
  decodeTSCOArray,
  FulfilledMatchAparition,
  FulfilledScorer,
} from "@/features/aparition/domain/aparition.schema";
import {
  decodeTSTATS,
  encodeTSTATS,
  FulfilledTeamStats,
} from "@/features/dashboard/domain/teamStats.schema";

export class DashboardService extends Context.Tag("DashboardService")<
  DashboardService,
  {
    readonly getLastMatches: (
      limit?: number
    ) => Effect.Effect<
      FulfilledMatch[],
      FetchError | JsonError | NoSessionError | NoTeamIdError | ParseError,
      ConfigService | FetchService | SessionService
    >;

    readonly getNextMatches: (
      limit?: number
    ) => Effect.Effect<
      FulfilledMatch[],
      FetchError | JsonError | NoSessionError | NoTeamIdError | ParseError,
      ConfigService | FetchService | SessionService
    >;

    readonly getTopScorers: () => Effect.Effect<
      FulfilledScorer[],
      FetchError | JsonError | NoSessionError | NoTeamIdError | ParseError,
      ConfigService | FetchService | SessionService
    >;
    readonly getTopAssists: () => Effect.Effect<
      FulfilledMatchAparition[],
      FetchError | JsonError | NoSessionError | NoTeamIdError | ParseError,
      ConfigService | FetchService | SessionService
    >;

    readonly getCalendar: () => Effect.Effect<
      FulfilledMatch[],
      FetchError | JsonError | NoSessionError | NoTeamIdError | ParseError,
      ConfigService | FetchService | SessionService
    >;

    readonly getTeamStats: () => Effect.Effect<
      FulfilledTeamStats,
      FetchError | JsonError | NoSessionError | NoTeamIdError | ParseError,
      ConfigService | FetchService | SessionService
    >;
  }
>() {}

export const dashboardService = DashboardService.of({
  getLastMatches: (limit = 3) =>
    Effect.gen(function* () {
      const configService = yield* ConfigService;
      const { dashboard } = yield* configService.getConfig;

      const sessionService = yield* SessionService;

      const tid = yield* sessionService.getTid();

      const { endpoint, method } = dashboard.getLastMatches(tid);

      const fetchService = yield* FetchService;
      const headers = yield* fetchService.getHeaders();

      const response = yield* fetchService.fetch({
        url: `${endpoint}?limit=${limit}`,
        init: { method, headers },
      });

      if (!response.ok)
        yield* Effect.fail(new FetchError({ message: response.statusText }));

      const json = yield* fetchService.getJson(response);

      const result = yield* Effect.forEach((a) => decodeFFM(a))(
        json as unknown[]
      );

      const lastMatches = yield* Effect.forEach((a) => encodeFFM(a))(result);

      return lastMatches as FulfilledMatch[];
    }),
  getNextMatches: (limit = 3) =>
    Effect.gen(function* () {
      const configService = yield* ConfigService;
      const { dashboard } = yield* configService.getConfig;

      const sessionService = yield* SessionService;

      const tid = yield* sessionService.getTid();

      const { endpoint, method } = dashboard.getNextMatches(tid);

      const fetchService = yield* FetchService;
      const headers = yield* fetchService.getHeaders();

      const response = yield* fetchService.fetch({
        url: `${endpoint}?limit=${limit}`,
        init: { method, headers },
      });

      if (!response.ok)
        yield* Effect.fail(new FetchError({ message: response.statusText }));

      const json = yield* fetchService.getJson(response);

      const result = yield* Effect.forEach((a) => decodeFFM(a))(
        json as unknown[]
      );

      const nextMatches = yield* Effect.forEach((a) => encodeFFM(a))(result);

      return nextMatches as FulfilledMatch[];
    }),
  getTopScorers: () =>
    Effect.gen(function* () {
      const configService = yield* ConfigService;
      const { dashboard } = yield* configService.getConfig;

      const sessionService = yield* SessionService;

      const tid = yield* sessionService.getTid();

      const { endpoint, method } = dashboard.getTopScorers(tid);

      const fetchService = yield* FetchService;
      const headers = yield* fetchService.getHeaders();

      const response = yield* fetchService.fetch({
        url: `${endpoint}`,
        init: { method, headers },
      });

      if (!response.ok)
        yield* Effect.fail(new FetchError({ message: response.statusText }));

      const json = yield* fetchService.getJson(response);

      const result = yield* decodeTSCOArray(json as unknown[]);

      return result as FulfilledScorer[];
    }),
  getTopAssists: () =>
    Effect.gen(function* () {
      const configService = yield* ConfigService;
      const { dashboard } = yield* configService.getConfig;

      const sessionService = yield* SessionService;

      const tid = yield* sessionService.getTid();

      const { endpoint, method } = dashboard.getAsists(tid);

      const fetchService = yield* FetchService;
      const headers = yield* fetchService.getHeaders();

      const response = yield* fetchService.fetch({
        url: `${endpoint}`,
        init: { method, headers },
      });

      if (!response.ok)
        yield* Effect.fail(new FetchError({ message: response.statusText }));

      const json = yield* fetchService.getJson(response);

      const result = yield* decodeFFMAArray(json as unknown[]);

      return result as FulfilledMatchAparition[];
    }),

  getCalendar: () =>
    Effect.gen(function* () {
      const configService = yield* ConfigService;
      const { dashboard } = yield* configService.getConfig;

      const sessionService = yield* SessionService;

      const tid = yield* sessionService.getTid();

      const { endpoint, method } = dashboard.getCalendar(tid);

      const fetchService = yield* FetchService;
      const headers = yield* fetchService.getHeaders();

      const response = yield* fetchService.fetch({
        url: `${endpoint}`,
        init: { method, headers },
      });

      if (!response.ok)
        yield* Effect.fail(new FetchError({ message: response.statusText }));

      const json = yield* fetchService.getJson(response);

      const result = yield* decodeFFMArray(json as unknown[]);

      return result as FulfilledMatch[];
    }),

  getTeamStats: () =>
    Effect.gen(function* () {
      const configService = yield* ConfigService;
      const { dashboard } = yield* configService.getConfig;

      const sessionService = yield* SessionService;

      const tid = yield* sessionService.getTid();

      const { endpoint, method } = dashboard.getTeamStats(tid);

      const fetchService = yield* FetchService;
      const headers = yield* fetchService.getHeaders();

      const response = yield* fetchService.fetch({
        url: `${endpoint}`,
        init: { method, headers },
      });

      if (!response.ok)
        yield* Effect.fail(new FetchError({ message: response.statusText }));

      const json = yield* fetchService.getJson(response);

      const result = yield* decodeTSTATS(json);

      const encoded = yield* encodeTSTATS(result);

      return encoded;
    }),
});
