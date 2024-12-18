import { FulfilledMatch } from "@/features/match/domain/match.schema";

import React, { useMemo } from "react";
import { Badge } from "../ui/badge";
import { Button } from "../ui/button";
import { Pencil } from "lucide-react";
import { cn } from "@/lib/utils";

interface MatchScoreBadgeProps {
  match: FulfilledMatch;
  onClick?: () => void;
}
function MatchScoreBadge({ match, onClick }: MatchScoreBadgeProps) {
  const hasHomeScore = useMemo(() => {
    return match.homeScore !== null || match.homeScore !== undefined;
  }, [match]);

  const hasAwayScore = useMemo(() => {
    return match.awayScore !== null || match.awayScore !== undefined;
  }, [match]);

  const hasBothScores = useMemo(() => {
    return hasHomeScore && hasAwayScore;
  }, [hasAwayScore, hasHomeScore]);

  return (
    <div className="flex">
      <Badge
        variant="outline"
        className={cn("flex gap-1 text-xl bg-background px-5", hasBothScores && 'border-blue-400')}
      >
        {hasBothScores ? (
          <>
            <span>{!hasHomeScore ? "0" : match.homeScore}</span>
            <span>:</span>
            <span>{!hasAwayScore ? "0" : match.awayScore}</span>
          </>
        ) : (
          <span>-</span>
        )}
      </Badge>
      {onClick && (
        <Button variant="ghost" className="rounded-full" onClick={onClick}>
          <Pencil size={14} />
        </Button>
      )}
    </div>
  );
}

export default MatchScoreBadge;
