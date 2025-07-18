"use client";

import { DropdownMenuItem } from "@/components/ui/dropdown-menu";
import { FulfilledPlayerWithStats } from "@/features/players/domain/player.effect.schema";
import { useSolidStore } from "@/providers/store.provider";
import { GitPullRequestArrow } from "lucide-react";

interface EditPlayerPositionProps {
  player: FulfilledPlayerWithStats;
}

function EditPlayerPosition({ player }: EditPlayerPositionProps) {
  const setSelectedPlayer = useSolidStore((state) => state.setSelectedPlayer);
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
