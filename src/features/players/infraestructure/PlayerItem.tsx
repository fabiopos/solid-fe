import { Badge } from "@/components/ui/badge";
import { PlayerType } from "../domain/player.schema";
import PlayerAvatar from "./PlayerAvatar";
import PositionCategoryBadge from "@/components/Player/PositionCategoryBadge";
import { FulfilledPlayer } from "../domain/player.effect.schema";

interface PlayerItemProps {
  player: FulfilledPlayer;
}

export default function PlayerItem({ player }: PlayerItemProps) {
  return (
    <div className="flex flex-col border gap-2 py-2 px-5">
      <div className="grid grid-cols-[1fr_4fr_1fr] py-2 items-center">
        <PlayerAvatar fallback={player?.shirtName ?? 'P'} imageUrl={null} />

        <div className="flex flex-col">
          <div className="flex gap-2">
            <span className="text-2xl">{player.firstName}</span>
            <span className="text-2xl">{player.lastName}</span>
          </div>
          <small>{player.email}</small>
          <PositionCategoryBadge category={player.favPosition?.category} />
        </div>
        <div className="flex items-center">
          <Badge variant="outline">
            {player.active ? "Active" : "Inactive"}
          </Badge>
        </div>
      </div>
    </div>
  );
}
