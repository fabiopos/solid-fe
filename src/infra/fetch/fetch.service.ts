import { FetchError, JsonError } from "@/entities/errors/errors.entity";
import { Console, Context, Effect } from "effect";
import { FetchParams } from "@/entities/fetch/fetch.entity";

export class FetchService extends Context.Tag("FetchService")<
  FetchService,
  {
    readonly fetch: (
      params: FetchParams
    ) => Effect.Effect<Response, FetchError>;

    readonly getJson: (response: Response) => Effect.Effect<unknown, JsonError>;
    readonly getHeaders: (token?: string) => Effect.Effect<Headers>;
  }
>() {}

export const fetchService = FetchService.of({
  fetch: ({ url, init }) =>
    Effect.tryPromise({
      try: () => fetch(`${process.env.NEXT_PUBLIC_BASE_API}${url}`, init),
      catch: (_error) => new FetchError({ message: "Fetch error" }),
    }).pipe(Effect.tapError(Console.log)),

  getJson: (response) =>
    Effect.tryPromise({
      try: () => response.json(),
      catch: () => new JsonError(),
    }).pipe(Effect.tapError(Console.log)),

  getHeaders: (token) => {
    const headers = new Headers();
    headers.append("Content-Type", "application/json");

    if (token) headers.append("Authorization", `Bearer ${token}`);

    return Effect.sync(() => headers);
  },
});
