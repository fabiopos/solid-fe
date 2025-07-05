import { Effect, pipe } from "effect";
import { PlayerUpdate } from "../PlayerUpdate";
import { ApiClient } from "@/lib/ApiClient";
import { PlayerUpdateType } from "../../domain/player.schema";
import { on } from "events";

interface IPlayerUpdateParams {
  playerId: string;
  player: PlayerUpdateType;
  token: string;
  onBeforeUpdate: () => void;
  onSuccessUpdate: (res: Response) => void;
  onErrorUpdate: (error: Error) => void;
}
export function playerUpdateEffect({
  player,
  playerId,
  token,
  onBeforeUpdate,
  onErrorUpdate,
  onSuccessUpdate,
}: IPlayerUpdateParams) {
  const client = new PlayerUpdate(new ApiClient());
  onBeforeUpdate();
  return pipe(
    Effect.tryPromise(() => client.editPlayer(playerId, player, token)),
    Effect.mapBoth({
      onFailure: onErrorUpdate,
      onSuccess: onSuccessUpdate,
    })
  );
}
