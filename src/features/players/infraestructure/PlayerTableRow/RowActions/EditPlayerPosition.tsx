"use client";

import { DropdownMenuItem } from "@/components/ui/dropdown-menu";
import { usePlayersStore } from "@/context/PlayersCtx";
import { FulfilledPlayer } from "@/features/players/domain/player.effect.schema";
import { GitPullRequestArrow } from "lucide-react";

interface EditPlayerPositionProps {
  player: FulfilledPlayer;
}

function EditPlayerPosition({ player }: EditPlayerPositionProps) {
  const { setSelectedPlayer } = usePlayersStore((state) => state);
  return (
    <DropdownMenuItem onClick={() => setSelectedPlayer(player)}>
      <div className="grid grid-cols-[110px_10px] items-center gap-2">
        <span>Edit field position</span>
        <GitPullRequestArrow className="text-purple-500" />
      </div>
    </DropdownMenuItem>
  );
}

export default EditPlayerPosition;
