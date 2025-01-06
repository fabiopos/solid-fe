import { Badge } from "@/components/ui/badge";
import { FulfilledMatchAparition } from "@/features/aparition/domain/aparition.schema";
import {
  FulfiledPlayerAparition,
  FulfilledPlayerWithStats,
} from "@/features/players/domain/player.effect.schema";
import { format } from "date-fns";
import Link from "next/link";

interface AparitionSummaryItemProps {
  aparition: FulfiledPlayerAparition;
}

function AparitionSummaryItem({ aparition }: AparitionSummaryItemProps) {
  return (
    <div className="flex flex-col">
      <div className="flex items-center justify-between">
        <div className="text-xs text-muted-foreground">
          {aparition.match?.title}
        </div>
        <div className="text-xs text-muted-foreground">
          {/* {aparition.match?.competition?.name} */}
        </div>
      </div>
      <div className="flex items-center justify-between">
        <div>
          <Link href={`/seasons/competitions/matches/${aparition.match?.id}`} className="hover:underline">
            {aparition.match?.homeTeam?.name} {aparition.match?.homeScore}{" "}
            {" - "}
            {aparition.match?.awayScore} {aparition.match?.awayTeam?.name}
          </Link>
        </div>
        <div className="flex flex-col justify-center items-center">
          {!!aparition.rating && (
            <Badge className="text-lg">{aparition.rating?.toFixed(1)}</Badge>
          )}
          {!!aparition.goals && (
            <span className="text-sm font-bold">{aparition.goals} goals</span>
          )}
        </div>
      </div>
      <div className="flex items-center justify-between">
        <div className="text-xs text-muted-foreground">
          {aparition.match?.matchDay &&
            format(aparition.match.matchDay, "dd/MM/yyyy")}
        </div>
        <div className="text-xs text-muted-foreground">
          {aparition.match?.location}
        </div>
      </div>
    </div>
  );
}

export default AparitionSummaryItem;
