import { configService, ConfigService } from "@/data/config/config.service";
import { fetchService, FetchService } from "@/data/fetch/fetch.service";
import { playerService } from "@/data/player/player.service";
import { sessionService, SessionService } from "@/data/session/session.service";
import { Effect } from "effect";

export class PlayerFacade {
  static getPlayers = () => {
    console.log("facade");
    const program = playerService
      .getPlayers()
      .pipe(
        Effect.provideService(ConfigService, configService),
        Effect.provideService(FetchService, fetchService),
        Effect.provideService(SessionService, sessionService)
      );

    return Effect.runPromise(program);
  };
}
