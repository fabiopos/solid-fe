import CompetitionStatusBadge from "@/components/Competition/CompetitionStatusBadge";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { FulfilledCompetition } from "@/features/competition/domain/competition.schema";
import { format } from "date-fns";
import { ArrowRight, Trophy } from "lucide-react";
import CompetitionTriggerIcon from "./CompetitionTriggerIcon";
import { DEFAULT_DATE_FORMAT } from "@/constants/date";
import { useCompetitionStore } from "@/context/CompetitionCtx";
import { cn } from "@/lib/utils";

interface SeasonCompetitionCardProps {
  competition: FulfilledCompetition;
}

function SeasonCompetitionCard({ competition }: SeasonCompetitionCardProps) {
  const status = useCompetitionStore((state) => state.deletingStatus);
  return (
    <Card className={cn("bg-slate-950/20",
      status.id === competition.id && status.status === 'IN_PROGRESS' && 'bg-slate-950/5'
    )}>
      <CardHeader>
        <div className="flex justify-between">
          <div>
            <CardTitle>
              <div className="flex items-center gap-2">
                <Trophy />
                <span>{competition?.name}</span>
              </div>
            </CardTitle>
            <small>{competition?.description ?? "no description"}</small>
          </div>
          <div>
            <CompetitionTriggerIcon competition={competition} />
          </div>
        </div>
        <Separator />
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-[2fr_2fr_1fr_2fr]">
          <div className="flex flex-col justify-center">
            <span className="text-2xl font-extrabold">
              {competition.matches?.length ?? 0}
            </span>
            <span className="text-sm font-extralight">Matches</span>
          </div>

          <div className="flex flex-col">
            <span className="text-lg font-extrabold">
              {competition?.startDate &&
                format(competition?.startDate, DEFAULT_DATE_FORMAT)}
            </span>
            <span className="text-sm font-extralight">Starts on</span>
          </div>

          <div className="flex flex-col">
            <ArrowRight />
          </div>

          <div className="flex flex-col">
            <span className="text-lg font-extrabold">
              {competition?.endDate &&
                format(competition?.endDate, DEFAULT_DATE_FORMAT)}
            </span>
            <span className="text-sm font-extralight">Ends on</span>
          </div>
        </div>
      </CardContent>
      <CardFooter>
        <div className="flex gap-2 text-sm justify-start w-full items-center">
          <CompetitionStatusBadge status={competition?.status} />
        </div>
      </CardFooter>
    </Card>
  );
}

export default SeasonCompetitionCard;
