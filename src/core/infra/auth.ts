import { auth } from "@/auth";
import { NoAuthError, NoTokenError } from "@/exceptions/NoTokenException";
import { Effect, pipe, Schedule } from "effect";

export function getSessionEffect() {
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

export function getToken() {
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

export function getTokenRetry() {
  const policy = Schedule.addDelay(Schedule.recurs(2), () => "100 millis");
  const task = getToken();
  const p = Effect.retryOrElse(task, policy, () =>
    Effect.fail(new Error("No token found after retries"))
  );
  return p;
}
