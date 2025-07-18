import { UpdateFieldPositionsParams } from "@/services/player/program/players/player.api";
import {
  getPWSByTeamId,
  updatePlayerPositions,
} from "@/services/player/program/players/player.service";
import { mutationOptions, queryOptions } from "@tanstack/react-query";
import { Effect } from "effect";

export const playerWithStatsQueryOptions = (
  selectedTeamId: string | undefined
) =>
  queryOptions({
    queryKey: ["players", selectedTeamId],
    queryFn: () =>
      Effect.runPromise(getPWSByTeamId({ teamId: selectedTeamId!, token: "" })),
    enabled: !!selectedTeamId,
  });

type PatchPayload = UpdateFieldPositionsParams & { token?: string };
type PatchPlayerPositionsOptionsParams = {
  onSuccess: (data: void, variables: PatchPayload, ctx: unknown) => void;
};
export const patchPlayerPositionsOptions = ({
  onSuccess,
}: PatchPlayerPositionsOptionsParams) =>
  mutationOptions({
    mutationFn: (payload: PatchPayload) =>
      Effect.runPromise(updatePlayerPositions(payload)),
    onSuccess,
  });
