import {
  decodeFP,
  encodeFP,
  FulfilledFieldPosition,
} from "@/features/fieldPosition/domain/field-position.schema";
import { FetchError, JsonError } from "@/services/http/errors/http.errors";
import { fetchRequest } from "@/services/http/program/http.program";
import { ParseError } from "@effect/schema/ParseResult";
import { Context, Effect } from "effect";
import { ConfigError } from "effect/ConfigError";
import { parseJson } from "../common";

interface FieldPositionsImpl {
  readonly getFieldPositions: Effect.Effect<
    FulfilledFieldPosition[],
    FetchError | JsonError | ParseError | ConfigError,
    never
  >;
}

export class FieldPositionsApi extends Context.Tag("FieldPositionsApi")<
  FieldPositionsApi,
  FieldPositionsImpl
>() {
  static readonly Live = (access_token: string) =>
    FieldPositionsApi.of({
      getFieldPositions: Effect.gen(function* () {
        const endpoint = `/field-position`;

        const defaultHeaders = new Headers();
        defaultHeaders.append("Content-Type", "application/json");
        defaultHeaders.append("Authorization", `Bearer ${access_token}`);

        const options = {
          headers: defaultHeaders,
          method: "GET",
        };

        const json = yield* fetchRequest({ endpoint, options });

        const fieldPositions = yield* parseJson(json);

        const fps = yield* Effect.forEach((a) => decodeFP(a))(fieldPositions);

        const encodedFP = yield* Effect.forEach((a) => encodeFP(a))(fps);

        return encodedFP as FulfilledFieldPosition[];
      }),
    });
}
