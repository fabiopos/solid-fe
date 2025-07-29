import { configService, ConfigService } from "@/data/config/config.service";
import { dashboardService } from "@/data/dashboard/dashboard.service";
import { fetchService, FetchService } from "@/data/fetch/fetch.service";
import { sessionService, SessionService } from "@/data/session/session.service";
import { Effect } from "effect";

export class DashboardFacade {
  static getLastMatches = (limit?: number | undefined) => {
    const program = dashboardService
      .getLastMatches(limit)
      .pipe(
        Effect.provideService(ConfigService, configService),
        Effect.provideService(FetchService, fetchService),
        Effect.provideService(SessionService, sessionService)
      );

    return Effect.runPromise(program);
  };
  static getNextMatches = (limit?: number | undefined) => {
    const program = dashboardService
      .getNextMatches(limit)
      .pipe(
        Effect.provideService(ConfigService, configService),
        Effect.provideService(FetchService, fetchService),
        Effect.provideService(SessionService, sessionService)
      );

    return Effect.runPromise(program);
  };

  static getTopScorers = () => {
    const program = dashboardService
      .getTopScorers()
      .pipe(
        Effect.provideService(ConfigService, configService),
        Effect.provideService(FetchService, fetchService),
        Effect.provideService(SessionService, sessionService)
      );

    return Effect.runPromise(program);
  };

  static getTopAsists = () => {
    const program = dashboardService
      .getTopAssists()
      .pipe(
        Effect.provideService(ConfigService, configService),
        Effect.provideService(FetchService, fetchService),
        Effect.provideService(SessionService, sessionService)
      );

    return Effect.runPromise(program);
  };

  static getCalendar = () => {
    const program = dashboardService
      .getCalendar()
      .pipe(
        Effect.provideService(ConfigService, configService),
        Effect.provideService(FetchService, fetchService),
        Effect.provideService(SessionService, sessionService)
      );

    return Effect.runPromise(program);
  };

  static getTeamStats = () => {
    const program = dashboardService
      .getTeamStats()
      .pipe(
        Effect.provideService(ConfigService, configService),
        Effect.provideService(FetchService, fetchService),
        Effect.provideService(SessionService, sessionService)
      );

    return Effect.runPromise(program);
  };
}
