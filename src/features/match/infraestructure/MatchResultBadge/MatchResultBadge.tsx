import { Badge } from "@/components/ui/badge";
import { FulfilledMatch } from "../../domain/match.schema";

const MatchResultBadge = ({
  match,
  teamId,
}: {
  match: FulfilledMatch;
  teamId: string;
}) => {
  const win = isWin(match, teamId);
  const draw = isDraw(match);
  const loss = isLoss(match, teamId);

  if (win) return <Badge variant="success">W</Badge>;
  if (draw) return <Badge variant="warning">D</Badge>;
  if (loss) return <Badge variant="destructive">L</Badge>;
  return null;
};

const isWin = (match: FulfilledMatch, teamId: string) => {
  if (match.homeScore === null || match.awayScore === null) return false;
  if (match.homeScore === undefined || match.awayScore === undefined)
    return false;

  if (match.homeTeam?.id === teamId) {
    return match.homeScore > match.awayScore;
  }
  return match.awayScore > match.homeScore;
};

const isDraw = (match: FulfilledMatch) => {
  if (match.homeScore === null || match.awayScore === null) return false;
  if (match.homeScore === undefined || match.awayScore === undefined)
    return false;

  return match.homeScore === match.awayScore;
};

const isLoss = (match: FulfilledMatch, teamId: string) => {
  if (match.homeScore === null || match.awayScore === null) return false;
  if (match.homeScore === undefined || match.awayScore === undefined)
    return false;

  if (match.homeTeam?.id === teamId) {
    return match.homeScore < match.awayScore;
  }
  return match.awayScore < match.homeScore;
};

export default MatchResultBadge;
