import { configService, ConfigService } from "@/infra/config/config.service";
import { fetchService, FetchService } from "@/infra/fetch/fetch.service";
import { playerService } from "@/infra/player/player.service";
import {
  sessionService,
  SessionService,
} from "@/infra/session/session.service";
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
