import { Effect } from "effect";
import { FieldPositionsApi } from "./fieldPositions.api";

const program = Effect.gen(function* () {
  const fieldPositionApi = yield* FieldPositionsApi;
  return yield* fieldPositionApi.getFieldPositions;
});

export const runnable = (access_token: string) =>
  program.pipe(
    Effect.provideService(
      FieldPositionsApi,
      FieldPositionsApi.Live(access_token)
    )
  );

export const getFieldPositions = (access_token: string) =>
  runnable(access_token);
