import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { FulfilledSeason } from "../../domain/season.schema";

import SeasonCardFooterItem from "./SeasonCardFooterItem";
import { useMemo } from "react";

import SeasonCardHeader from "./SeasonCardHeader";

interface SeasonCardProps {
  season: FulfilledSeason;
}

function SeasonCard(props: SeasonCardProps) {
  const { season: s } = props;

  const countComp = useMemo(
    () => s.competitions?.length ?? 0,
    [s.competitions]
  );
  return (
    <Card>
      <CardHeader>
        <SeasonCardHeader season={s} />
      </CardHeader>

      <CardContent>
        <div className="flex gap-2">          
          <div className="flex justify-start gap-20">
            <SeasonCardFooterItem label="competitions" value={countComp} />
            <SeasonCardFooterItem label="matches" value={0} />
            <SeasonCardFooterItem label="won" value={0} />
            <SeasonCardFooterItem label="drawn" value={0} />
            <SeasonCardFooterItem label="lost" value={0} />
          </div>
        </div>
      </CardContent>
      <CardFooter></CardFooter>
    </Card>
  );
}

export default SeasonCard;
