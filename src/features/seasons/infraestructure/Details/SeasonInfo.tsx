import { format } from "date-fns";
import { FulfilledSeason } from "../../domain/season.schema";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import SeasonStatusBadge from "@/components/Season/SeasonStatusBadge";
import { Separator } from "@/components/ui/separator";
import { ReactNode } from "react";

interface SeasonInfoProps {
  season: FulfilledSeason | null;
  children: ReactNode;
}

const DATE_FORMAT = "dd MMMM, yyyy";

function SeasonInfo({ season, children }: SeasonInfoProps) {
  return (
    <>
      <Card className="">
        <CardHeader>
          <div className="flex justify-between">
            <div>
              <CardTitle>{season?.name}</CardTitle>
              <small>{season?.description}</small>
            </div>
            <div>
              <SeasonStatusBadge status={season?.status} />
            </div>
          </div>
          <Separator />
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 grid-rows-2 gap-5">
            <div className="flex flex-col">
              <span className="text-xl font-extrabold">
                {season?.team?.name}
              </span>
              <span className="text-sm font-extralight">Team</span>
            </div>
            <div className="flex flex-col">
              <span className="text-xl font-extrabold">
                {season?.competitions?.length ?? 0}
              </span>
              <span className="text-sm font-extralight">Competitions</span>
            </div>
            <div className="flex flex-col">
              <span className="text-xl font-extrabold">
                {season?.startDate && format(season?.startDate, DATE_FORMAT)}
              </span>
              <span className="text-sm font-extralight">Starts on</span>
            </div>

            <div className="flex flex-col">
              <span className="text-xl font-extrabold">
                {season?.endDate && format(season?.endDate, DATE_FORMAT)}
              </span>
              <span className="text-sm font-extralight">Ends on</span>
            </div>
          </div>
          {children}
        </CardContent>
        <CardFooter></CardFooter>
      </Card>
    </>
  );
}

export default SeasonInfo;
