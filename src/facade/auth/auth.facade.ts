import {
  AuthSchemaType,
  CredentialsSchemaType,
} from "@/entities/auth/Auth.entity";
import { authService } from "@/data/auth/auth.service";
import { configService, ConfigService } from "@/data/config/config.service";
import { fetchService, FetchService } from "@/data/fetch/fetch.service";
import { Console, Effect } from "effect";

// auth facade
export class AuthFacade {
  static login(credentials: CredentialsSchemaType): Promise<AuthSchemaType> {
    const program = authService
      .login(credentials)
      .pipe(
        Effect.provideService(ConfigService, configService),
        Effect.provideService(FetchService, fetchService)
      )
      .pipe(Effect.tapError(Console.log));
    return Effect.runPromise(program);
  }
}
