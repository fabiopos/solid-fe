import { getFieldPositions } from "@/services/player/program/fieldPositions/fieldPositions.service";
import { queryOptions } from "@tanstack/react-query";
import { Effect } from "effect";

export const fieldPositionsQueryOptions = (access_token: string | undefined) =>
  queryOptions({
    queryKey: ["field-positions"],
    queryFn: () => Effect.runPromise(getFieldPositions(access_token!)),
    enabled: !!access_token,
  });
