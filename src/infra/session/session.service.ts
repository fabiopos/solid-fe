import { auth } from "@/auth";
import { NoSessionError, NoTeamIdError } from "@/entities/errors/errors.entity";
import { NoTokenError } from "@/exceptions/NoTokenException";
import { isServer } from "@/lib/utils";
import { Context, Effect } from "effect";
import { Session } from "next-auth";
import { getSession } from "next-auth/react";
import * as R from "rambdax";

export class SessionService extends Context.Tag("SessionService")<
  SessionService,
  {
    readonly getSession: () => Effect.Effect<Session | null, NoSessionError>;
    readonly getTid: () => Effect.Effect<
      string,
      NoSessionError | NoTeamIdError
    >;
    readonly getToken: () => Effect.Effect<
      string,
      NoSessionError | NoTokenError
    >;
  }
>() {}

const pluckSession = Effect.tryPromise({
  try: () => (isServer() ? auth() : getSession()),
  catch: () => new NoSessionError(),
});

export const sessionService = SessionService.of({
  getSession: () =>
    Effect.gen(function* () {
      const session = yield* pluckSession;
      return session;
    }),

  getTid: () =>
    Effect.gen(function* () {
      const session = yield* pluckSession;

      if (R.isNil(session)) return yield* Effect.fail(new NoSessionError());

      if (R.isNil(session.user.tid))
        return yield* Effect.fail(new NoTeamIdError());

      return session.user.tid;
    }),

  getToken: () =>
    Effect.gen(function* () {
      const session = yield* pluckSession;
      if (R.isNil(session)) return yield* Effect.fail(new NoSessionError());

      if (R.isNil(session.user.access_token))
        return yield* Effect.fail(new NoTokenError());

      return session.user.access_token;
    }),
});
