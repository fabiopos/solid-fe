"use client";
import { Progress } from "@/components/ui/progress";
import { Separator } from "@/components/ui/separator";
import { FulfilledTeamStats } from "@/features/dashboard/domain/teamStats.schema";
import { useMemo } from "react";

interface TeamStatBoxesProps {
  stats: FulfilledTeamStats;
}

function TeamStatBoxes({ stats }: TeamStatBoxesProps) {
  const { competitionsCount, drawn, lost, matchesCount, seasonsCount, won } =
    stats;

  const winPerc = useMemo(() => {
    return Number(((won / matchesCount) * 100).toFixed(0));
  }, []);

  const drawPerc = useMemo(() => {
    return Number(((drawn / matchesCount) * 100).toFixed(0));
  }, []);

  const lossPerc = useMemo(() => {
    return Number(((lost / matchesCount) * 100).toFixed(0));
  }, []);

  return (
    <div className="flex flex-col gap-1 justify-between px-5 my-2">
      <div className="flex justify-between text-sm text-muted-foreground">
        <div>Total Matches</div>
        <div>{matchesCount}</div>
      </div>

      <div className="flex justify-between text-sm text-foreground/50">
        <div>Win</div>
        <div>{won}</div>
      </div>

      <div className="flex justify-between text-sm text-foreground/50">
        <div>Lost</div>
        <div>{lost}</div>
      </div>

      <div className="flex justify-between text-sm text-foreground/50">
        <div>Drawn</div>
        <div>{drawn}</div>
      </div>

      <div className="flex justify-between text-sm text-foreground/50">
        <div>Seasons</div>
        <div>{seasonsCount}</div>
      </div>

      <div className="flex justify-between text-sm text-foreground/50">
        <div>Competitions</div>
        <div>{competitionsCount}</div>
      </div>

      <Separator className="my-2" />

      <div className="grid grid-cols-[80%_auto] items-center justify-between gap-2">
        <Progress
          value={winPerc}
          className="w-[100%]"
          color="bg-[hsl(var(--color-win))]"
        />
        <div className="font-bold text-[hsl(var(--color-win))] flex items-center gap-2">
          {winPerc}% <small className="font-normal text-xs">won</small>
        </div>
      </div>

      <div className="grid grid-cols-[80%_auto] items-center justify-between gap-2">
        <Progress
          value={drawPerc}
          className="w-[100%]"
          color="bg-[hsl(var(--color-draw))]"
        />
        <div className="font-bold text-[hsl(var(--color-draw))] flex items-center gap-2">
          {drawPerc}% <small className="font-normal text-xs">draw</small>
        </div>
      </div>

      <div className="grid grid-cols-[80%_auto] justify-between gap-2">
        <Progress
          value={lossPerc}
          className="w-[100%]"
          color="bg-[hsl(var(--color-lost))]"
        />

        <div className="font-bold text-[hsl(var(--color-lost))] flex items-center gap-2">
          {lossPerc}% <small className="font-normal text-xs">lost</small>
        </div>
      </div>

      {/* <div className="flex justify-between gap-2">
        <div className="font-bold text-[hsl(var(--color-draw))]">Drawn</div>
        <div className="font-bold text-[hsl(var(--color-draw))]">{drawn}</div>
      </div>

      <div className="flex justify-between gap-2">
        <div className="font-bold text-[hsl(var(--color-lost))]">Lost</div>
        <div className="font-bold text-[hsl(var(--color-lost))]">{lost}</div>
      </div> */}

      <div className="my-2 text-right">
        <small className="text-foreground/40 italic">
          The stats are based on completed matches only
        </small>
      </div>
    </div>
  );
}

export default TeamStatBoxes;
