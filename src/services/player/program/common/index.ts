/* eslint-disable @typescript-eslint/no-explicit-any */
import { JsonError } from "@/services/http/errors/http.errors";
import { Effect, pipe } from "effect";
import { isArray } from "effect/Array";

export const parseJson = (data: any): Effect.Effect<unknown[], JsonError> => {
  return pipe(
    data,
    isArray,
    Effect.if({
      onFalse: () => Effect.fail(new JsonError()),
      onTrue: () => Effect.succeed(data as unknown[]),
    })
  );
};
