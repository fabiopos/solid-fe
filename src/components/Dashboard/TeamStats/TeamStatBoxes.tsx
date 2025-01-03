import { FulfilledTeamStats } from "@/features/dashboard/domain/teamStats.schema";

interface TeamStatBoxesProps {
  stats: FulfilledTeamStats;
}

function TeamStatBoxes({ stats }: TeamStatBoxesProps) {
  const { competitionsCount, drawn, lost, matchesCount, seasonsCount, won } =
    stats;
  return (
    <div className="flex flex-col gap-1 justify-between px-5 my-2">
      <div className="flex justify-between gap-2">
        <div className="font-bold text-[hsl(var(--color-win))]">Won</div>
        <div className="font-bold text-[hsl(var(--color-win))]">{won}</div>
      </div>

      <div className="flex justify-between gap-2">
        <div className="font-bold text-[hsl(var(--color-draw))]">Drawn</div>
        <div className="font-bold text-[hsl(var(--color-draw))]">{drawn}</div>
      </div>

      <div className="flex justify-between gap-2">
        <div className="font-bold text-[hsl(var(--color-lost))]">Lost</div>
        <div className="font-bold text-[hsl(var(--color-lost))]">{lost}</div>
      </div>

      <div className="flex justify-between text-sm text-foreground/50">
        <div>Seasons</div>
        <div>{seasonsCount}</div>
      </div>

      <div className="flex justify-between text-sm text-foreground/50">
        <div>Competitions</div>
        <div>{competitionsCount}</div>
      </div>

      <div className="flex justify-between text-sm text-foreground/50">
        <div>Matches</div>
        <div>{matchesCount}</div>
      </div>

      <div className="my-2 text-right">
        <small className="text-foreground/40 italic">The stats are based on completed matches only</small>
      </div>
    </div>
  );
}

export default TeamStatBoxes;
