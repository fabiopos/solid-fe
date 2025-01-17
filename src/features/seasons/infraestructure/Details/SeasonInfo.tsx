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
import { DEFAULT_DATE_FORMAT } from "@/constants/date";

interface SeasonInfoProps {
  season: FulfilledSeason | null;  
}

function SeasonInfo({ season }: SeasonInfoProps) {
  return (
    <>
      <Card className="relative bg-slate-800">
        {/* <div className="w-[80px] h-[40px] bg-transparent absolute -top-4 left-[95%] rounded-full flex justify-center items-center ">
          <SeasonStatusBadge status={season?.status} />
        </div> */}
        <CardHeader>
          <div className="flex justify-between">
            <div>
              <CardTitle className="flex gap-2">
                <span>Season Details</span>
                {season?.name}</CardTitle>
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
                {season?.startDate &&
                  format(season?.startDate, DEFAULT_DATE_FORMAT)}
              </span>
              <span className="text-sm font-extralight">Starts on</span>
            </div>

            <div className="flex flex-col">
              <span className="text-xl font-extrabold">
                {season?.endDate &&
                  format(season?.endDate, DEFAULT_DATE_FORMAT)}
              </span>
              <span className="text-sm font-extralight">Ends on</span>
            </div>
          </div>
          
        </CardContent>
        <CardFooter></CardFooter>
      </Card>
    </>
  );
}

export default SeasonInfo;
