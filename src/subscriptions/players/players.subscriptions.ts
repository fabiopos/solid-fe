import { FulfilledPlayerWithStats } from "@/features/players/domain/player.effect.schema";

export function onSelectPlayer(player: FulfilledPlayerWithStats | null) {
  if (player) console.log("onSelectPlayer:subscription", player.id);
}
