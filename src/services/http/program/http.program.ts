import { Effect } from "effect";
import { FetchError, JsonError } from "../errors/http.errors";

const baseUrl = process.env.NEXT_PUBLIC_BASE_API;

interface FetchOptions {
  endpoint: string;
  options?: RequestInit;
}

export const fetchReq = ({ endpoint, options }: FetchOptions) =>
  Effect.tryPromise({
    try: () => fetch(`${baseUrl}${endpoint}`, options),
    catch: () => new FetchError(),
  });

const jsonResponse = (response: Response) =>
  Effect.tryPromise({
    try: () => response.json(),
    catch: () => new JsonError(),
  });

export const fetchRequest = ({ endpoint, options }: FetchOptions) =>
  Effect.gen(function* () {
    const response = yield* fetchReq({ endpoint, options });

    if (!response.ok) {
      return yield* new FetchError();
    }

    const json = yield* jsonResponse(response);

    return json;
  });

export const getDefaultOptions = (method: string, token?: string) =>
  Effect.gen(function* () {
    const defaultHeaders = new Headers();
    defaultHeaders.append("Content-Type", "application/json");
    defaultHeaders.append("Authorization", `Bearer ${token}`);

    const options = {
      headers: defaultHeaders,
      method,
    } as RequestInit;

    return options;
  });
