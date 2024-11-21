import { FulfilledMatch } from "@/features/match/domain/match.schema";

import React, { useMemo } from "react";
import { Badge } from "../ui/badge";

interface MatchScoreBadgeProps {
  match: FulfilledMatch;
}
function MatchScoreBadge({ match }: MatchScoreBadgeProps) {
  const hasHomeScore = useMemo(() => {
    return match.homeScore === null || match.homeScore === undefined;
  }, [match]);

  const hasAwayScore = useMemo(() => {
    return match.awayScore === null || match.awayScore === undefined;
  }, [match]);

  const hasBothScores = useMemo(() => {
    return hasHomeScore && hasAwayScore;
  }, [hasAwayScore, hasHomeScore]);

  return (
    <Badge variant="outline" className="flex gap-1 text-xl bg-background px-5">
      {hasBothScores ? (
        <>
          <span>{hasHomeScore ? "0" : match.homeScore}</span>
          <span>:</span>
          <span>{hasAwayScore ? "0" : match.awayScore}</span>
        </>
      ) : (
        <span>-</span>
      )}
    </Badge>
  );
}

export default MatchScoreBadge;
