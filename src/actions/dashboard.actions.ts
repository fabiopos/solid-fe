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
import { NoTeamSelectedError } from "@/shared/errors/NoTeamSelectedError";
import { isPast, toDate } from "date-fns";
import { Effect, flow, pipe } from "effect";
import { Session } from "next-auth";

export function getLastMatches() {
  return flow(
    getToken,
    Effect.map((token) => ({ token })),
    Effect.map((a) =>
      getTeamIdEffect().pipe(
        Effect.map((teamId) => ({ teamId, token: a.token, limit: LIMIT }))
      )
    ),
    Effect.flatten,
    Effect.map(getLastMatchesEffect),
    Effect.flatten
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
        catch: () => new NoAuthError(),
      }),
    Effect.map((session) => Effect.succeed(session)),
    Effect.flatten
  );
}

function validateSession(session: Session | null) {
  return pipe(session, (s) =>
    isPast(toDate(s?.expires ?? "")) ? false : true
  );
}

export function getToken() {
  return pipe(
    undefined,
    getSessionEffect,
    Effect.map((session) =>
      validateSession(session)
        ? Effect.succeed(session?.user.access_token ?? "")
        : Effect.fail(new NoTokenError())
    ),
    Effect.flatten
    // Effect.tapError(() => redirect("/logout"))
  );
}

function getTeamIdEffect() {
  return pipe(
    Effect.tryPromise({
      try: () => getCookieTeamId(),
      catch: () => new NoTeamSelectedError(),
    }),
    Effect.matchEffect({
      onSuccess: (teamId) =>
        teamId
          ? Effect.succeed(teamId)
          : Effect.fail(new NoTeamSelectedError("No team selected")),
      onFailure: (e) => Effect.fail(e),
    })
  );
}
