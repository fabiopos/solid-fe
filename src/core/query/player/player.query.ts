import { getPWSByTeamId } from "@/services/player/program/players/player.service";
import { queryOptions } from "@tanstack/react-query";
import { Effect } from "effect";

export const playerWithStatsQueryOptions = (
  selectedTeamId: string | undefined
) =>
  queryOptions({
    queryKey: ["players", selectedTeamId],
    queryFn: () => Effect.runPromise(getPWSByTeamId(selectedTeamId!)),
    enabled: !!selectedTeamId,
  });
