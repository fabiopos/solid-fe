import { Effect } from "effect";
import {
  DELETEPlayerParams,
  PATCHPlayerParams,
  UpdateFieldPositionsParams,
} from "@/services/player/program/players/player.api";
import { deletePlayer } from "@/services/player/program/players/player.delete.service";
import { mutationOptions, queryOptions } from "@tanstack/react-query";
import {
  updatePlayer,
  updatePlayerPositions,
} from "@/services/player/program/players/player.update.service";
import { PlayerFacade } from "@/facade/player/PlayerFacade";

export const playerWithStatsQueryOptions = (
  selectedTeamId: string | undefined
) =>
  queryOptions({
    queryKey: ["players", selectedTeamId],
    queryFn: () => PlayerFacade.getPlayers(),
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

type PatchPlayerOptionsParams = {
  onSuccess?: (data: void, variables: PATCHPlayerParams, ctx: unknown) => void;
};

export const patchPlayerOptions = ({ onSuccess }: PatchPlayerOptionsParams) =>
  mutationOptions({
    mutationFn: (payload: PATCHPlayerParams) =>
      Effect.runPromise(updatePlayer(payload)),
    onSuccess,
  });

type DeletePlayerOptionsParams = {
  onSuccess: (data: void, variables: DELETEPlayerParams, ctx: unknown) => void;
};

export const deletePlayerOptions = ({ onSuccess }: DeletePlayerOptionsParams) =>
  mutationOptions({
    mutationFn: (payload: DELETEPlayerParams) =>
      Effect.runPromise(deletePlayer(payload)),
    onSuccess,
  });
