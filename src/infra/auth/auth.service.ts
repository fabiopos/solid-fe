import {
  authSchema,
  AuthSchemaType,
  CredentialsSchemaType,
} from "@/entities/auth/Auth.entity";
import {
  FetchError,
  InvalidCredsError,
  JsonError,
} from "@/entities/errors/errors.entity";
import { Console, Context, Effect, Schema } from "effect";
import { ConfigService } from "../config/config.service";
import { FetchService } from "../fetch/fetch.service";

export class AuthService extends Context.Tag("AuthService")<
  AuthService,
  {
    readonly login: (
      credentials: CredentialsSchemaType
    ) => Effect.Effect<
      AuthSchemaType,
      FetchError | JsonError | InvalidCredsError,
      ConfigService | FetchService
    >;
  }
>() {}

export const authService = AuthService.of({
  login: (creds) =>
    Effect.gen(function* () {
      Console.log(`authService:`);

      const configService = yield* ConfigService;
      const { auth } = yield* configService.getConfig;

      const { endpoint, method } = auth.getLoginEndpoint();
      Console.log(`authService:`, endpoint, method);

      const fetchService = yield* FetchService;
      const headers = yield* fetchService.getHeaders();

      const response = yield* fetchService.fetch({
        url: endpoint,
        init: { method, body: JSON.stringify(creds), headers },
      });

      if (!response.ok) throw new InvalidCredsError();

      const json = yield* fetchService.getJson(response);

      const result = Schema.decodeUnknownSync(authSchema)(json);

      return result;
    }),
});
