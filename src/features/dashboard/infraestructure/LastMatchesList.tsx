import { FulfilledMatch } from "@/features/match/domain/match.schema";
import { format, formatDistanceToNowStrict } from "date-fns";

interface LastMatchesListProps {
  lastMatches: FulfilledMatch[];
}

function LastMatchesList({ lastMatches }: LastMatchesListProps) {
  return (
    <div className="p-5 space-y-5 border">
      {lastMatches.map((m) => (
        <div className="flex flex-col" key={`last-match-${m.id}`}>
          <span className="font-bold text-foreground/80">
            {m.homeTeam?.name} vs {m.awayTeam?.name}
          </span>
          <span className="text-xs dark:text-slate-300 text-muted-foreground">
            {m.matchDay && format(m.matchDay, "PPP")} - {m.location}
          </span>
          <span className="text-xs dark:text-slate-300 text-muted-foreground">
            {m.matchDay && formatDistanceToNowStrict(m.matchDay)} ago
          </span>
        </div>
      ))}
    </div>
  );
}

export default LastMatchesList;
