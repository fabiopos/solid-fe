import StatBox from "@/components/ui/stat-box";
import { FulfilledPlayerWithStats } from "@/features/players/domain/player.effect.schema";
import React from "react";

interface StatBoxesProps {
  player: FulfilledPlayerWithStats;
}

function StatBoxes({ player }: StatBoxesProps) {
  return (
    <div className="grid grid-cols-[repeat(auto-fit,_minmax(100px,_1fr))] gap-2 w-full">
      <StatBox
        value={`${player.playedMatches} / ${player.totalTeamMatches}`}
        label="Played Matches"
      />
      <StatBox value={player.goalsCount} label="Goals" />
      <StatBox value={player.goalsAvg?.toFixed(2)} label="Goals Avg." />
      <StatBox value={player.minutesPlayed} label="Minutes Played" />
      <StatBox
        value={`${player.minutesPerc?.toFixed(2)}%`}
        label="Minutes Played %"
      />
    </div>
  );
}

export default StatBoxes;
