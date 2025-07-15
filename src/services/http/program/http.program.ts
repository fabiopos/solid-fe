import { Config, Effect } from "effect";
import { FetchError, JsonError } from "../errors/http.errors";

const config = Config.string("NEXT_PUBLIC_BASE_API");

const fetchReq = (endpoint: string) =>
  Effect.tryPromise({
    try: () => fetch(endpoint),
    catch: () => new FetchError(),
  });

const jsonResponse = (response: Response) =>
  Effect.tryPromise({
    try: () => response.json(),
    catch: () => new JsonError(),
  });

export const fetchRequest = (resource: string) =>
  Effect.gen(function* () {
    const baseUrl = yield* config;
    const endpoint = `${baseUrl}${resource}`;

    // yield* Console.log("retrieving", endpoint);

    const response = yield* fetchReq(endpoint);

    if (!response.ok) {
      return yield* new FetchError();
    }

    const json = yield* jsonResponse(response);

    return json;
  });
