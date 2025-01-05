'use client'
import { useTeamId } from "@/hooks/use-team-id";
import { FulfilledMatch } from "../../domain/match.schema";
import MatchResultBadge from "../MatchResultBadge/MatchResultBadge";
import { format } from "date-fns";

interface MatchesShortResultsProps {
  matches: readonly FulfilledMatch[];
}

function MatchesShortResults({ matches }: MatchesShortResultsProps) {
  const selectedTeamId = useTeamId();
  if (!selectedTeamId) return null;
  return (
    <div className="flex flex-wrap gap-5">
      {matches.toReversed().map((match) => (
        <div key={match.id} className="flex flex-col justify-center items-center">
          <MatchResultBadge match={match} teamId={selectedTeamId} />
          <small className="text-muted-foreground text-xs">
            {match.matchDay && format(match.matchDay, "dd/MMM")}
          </small>
        </div>
      ))}
    </div>
  );
}

export default MatchesShortResults;
