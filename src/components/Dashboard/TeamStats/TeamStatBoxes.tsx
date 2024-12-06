import { FulfilledTeamStats } from "@/features/dashboard/domain/teamStats.schema";

interface TeamStatBoxesProps {
  stats: FulfilledTeamStats;
}

function TeamStatBoxes({ stats }: TeamStatBoxesProps) {
  const { competitionsCount, drawn, lost, matchesCount, seasonsCount, won } =
    stats;
  return (
    <div className="flex flex-col gap-2 justify-between mt-2">
      <div className="flex justify-between gap-2">
        <div className="font-bold">Won</div>
        <div>{won}</div>
      </div>

      <div className="flex justify-between gap-2">
        <div className="font-bold">Drawn</div>
        <div>{drawn}</div>
      </div>

      <div className="flex justify-between gap-2">
        <div className="font-bold">Lost</div>
        <div>{lost}</div>
      </div>

      <div className="flex justify-between gap-2 text-sm text-slate-500">
        <div>Seasons</div>
        <div>{seasonsCount}</div>
      </div>

      <div className="flex justify-between gap-2 text-sm text-slate-500">
        <div>Competitions</div>
        <div>{competitionsCount}</div>
      </div>

      <div className="flex justify-between gap-2 text-sm text-slate-500">
        <div>Matches</div>
        <div>{matchesCount}</div>
      </div>

      <div className="my-1 text-right">
        <small className="text-slate-500">The stats are based on completed matches only</small>
      </div>
    </div>
  );
}

export default TeamStatBoxes;
