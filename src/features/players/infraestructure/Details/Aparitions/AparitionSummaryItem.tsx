import { Badge } from "@/components/ui/badge";
import { FulfiledPlayerAparition } from "@/features/players/domain/player.effect.schema";
import { format } from "date-fns";
import { RectangleVerticalIcon } from "lucide-react";
import Link from "next/link";

interface AparitionSummaryItemProps {
  aparition: FulfiledPlayerAparition;
}

function AparitionSummaryItem({ aparition }: AparitionSummaryItemProps) {
  return (
    <div className="flex flex-col">
      <div className="flex items-center justify-between py-2">
        <div className="text-xs text-muted-foreground">
          {aparition.match?.title} - {aparition.match?.competition?.name}
        </div>
        <div className="text-xs text-muted-foreground">
          {!!aparition.yellowCards && (
            <div className="relative">
              <RectangleVerticalIcon
                className="text-yellow-300 rotate-[15deg]"
                fill="yellow"
              />{" "}
              <span className="font-bold absolute -bottom-1 -right-0">
                x{aparition.yellowCards}
              </span>
            </div>
          )}
        </div>
      </div>
      <div className="flex items-center justify-between">
        <div>
          <Link
            href={`/seasons/competitions/matches/${aparition.match?.id}`}
            className="hover:underline"
          >
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
