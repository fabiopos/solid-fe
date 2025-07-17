import { Effect } from "effect";
import { FetchError, JsonError } from "../errors/http.errors";

const baseUrl = process.env.NEXT_PUBLIC_BASE_API;

interface FetchOptions {
  endpoint: string;
  options?: RequestInit;
}

const fetchReq = ({ endpoint, options }: FetchOptions) =>
  Effect.tryPromise({
    try: () => fetch(endpoint, options),
    catch: () => new FetchError(),
  });

const jsonResponse = (response: Response) =>
  Effect.tryPromise({
    try: () => response.json(),
    catch: () => new JsonError(),
  });

export const fetchRequest = ({ endpoint: resource, options }: FetchOptions) =>
  Effect.gen(function* () {
    const endpoint = `${baseUrl}${resource}`;

    // yield* Console.log("retrieving", endpoint);

    const response = yield* fetchReq({ endpoint, options });

    if (!response.ok) {
      return yield* new FetchError();
    }

    const json = yield* jsonResponse(response);

    return json;
  });
