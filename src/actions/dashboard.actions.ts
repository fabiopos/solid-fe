import { getCookieTeamId } from "@/app/actions";
import { auth } from "@/auth";
import { LIMIT } from "@/constants/dashboard.constants";
import { LastMatchesError } from "@/exceptions/DashboardExceptions";
import { NoAuthError, NoTokenError } from "@/exceptions/NoTokenException";
import {
  DashboardGet,
  LastMatchesPayload,
} from "@/features/dashboard/application/DashboardGet";
import { ApiClient } from "@/lib/ApiClient";
import { Effect, flow, pipe } from "effect";

export function getLastMatches() {
  return flow(
    getToken,
    Effect.orDie,
    Effect.map((token) => ({ token })),
    Effect.map((a) =>
      getTeamIdEffect().pipe(
        //Effect.mapError((_e) => Effect.succeed([])),
        Effect.map((teamId) => ({ teamId, token: a.token, limit: LIMIT }))
      )
    ),
    Effect.flatten,
    Effect.map(getLastMatchesEffect),
    Effect.flatten,
    
  );
}

function getLastMatchesEffect(payload: LastMatchesPayload) {
  const client = new DashboardGet(new ApiClient());
  return pipe(payload, () =>
    Effect.tryPromise({
      try: () => client.getLastMatches(payload),
      catch: () => new LastMatchesError("Cannot retrieve last matches"),
    })
  );
}

function getSessionEffect() {
  return pipe(
    null,
    () =>
      Effect.tryPromise({
        try: () => auth(),
        catch: () => new NoAuthError("Not autheticated"),
      }),
    Effect.map((session) => Effect.succeed(session)),
    Effect.flatten
  );
}

function getToken() {
  return pipe(
    undefined,
    getSessionEffect,
    Effect.map((session) =>
      session
        ? Effect.succeed(session.user.access_token)
        : Effect.fail(new NoTokenError("No user found"))
    ),
    Effect.flatten
  );
}

function getTeamIdEffect() {
  return pipe(
    Effect.tryPromise({
      try: () => getCookieTeamId(),
      catch: () => new Error(),
    }),
    Effect.matchEffect({
      onSuccess: (teamId) =>
        teamId
          ? Effect.succeed(teamId)
          : Effect.fail(new Error("No team selected")),
      onFailure: (e) => Effect.fail(e),
    })
  );
}
