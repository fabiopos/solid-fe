"use client";
import { H2 } from "@/components/ui/typograhpy";
import { usePlayerDetailsStore } from "@/context/PlayerDetailsCtx";
import ActiveText from "@/components/ui/active-text";
import { PlayerDetailsForm } from "./Form/Form";
import EditPlayerAvatarInput from "./Form/EditPlayerAvatarInput";
import StatBoxes from "./StatBoxes/StatBoxes";
import AparitionList from "./Aparitions/AparitionList";
import { Badge } from "@/components/ui/badge";
import { Shirt } from "lucide-react";
import { formatDistanceToNowStrict } from "date-fns";

function PlayerDetailsFt() {
  const player = usePlayerDetailsStore((state) => state.player);
  if (!player) return null;
  if (!player.id) return null;

  return (
    <div className="p-2">
      <div className="flex gap-5 items-center bg-background p-2 border rounded-lg">
        <EditPlayerAvatarInput avatarUrl={player?.avatarUrl} pid={player.id} />
        <div className="flex flex-col">
          <H2>
            {player?.firstName} {player?.lastName}{" "}
            <small className="text-lg">({player.shirtName})</small>
          </H2>

          <div className="flex gap-2 p-2">
            <Shirt />
            <Badge variant="outline">#{player.shirtNumber}</Badge>
            <span>Size {player.shirtSize}</span>
          </div>

          {player.bornDate && (
            <div className="text-sm">
              <span> {formatDistanceToNowStrict(player.bornDate)}</span>
            </div>
          )}
          <span className="text-sm capitalize">
            <span>{player.dominantFoot} foot</span>
          </span>
          <div className="text-sm">
            <span>{player.email}</span>
          </div>

          <ActiveText isActive={player?.active} />
        </div>
      </div>

      <div className="grid grid-cols-2 justify-center mt-2 w-full gap-2">
        <PlayerDetailsForm player={player} />
        <div className="flex flex-col items-start gap-2 p-5 bg-background border rounded-lg">
          <h3 className="font-bold">Player Stats</h3>
          <StatBoxes player={player} />
          <AparitionList player={player} />
        </div>
      </div>
    </div>
  );
}

export default PlayerDetailsFt;
