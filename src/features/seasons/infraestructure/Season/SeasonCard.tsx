import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { FulfilledSeason } from "../../domain/season.schema";
import { format } from "date-fns";
import SeasonCardFooterItem from "./SeasonCardFooterItem";
import { useMemo } from "react";
import SeasonActionTriggerIcon from "./SeasonActionTriggerIcon";
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
        <p>{s.description}</p>
      </CardContent>
      <CardFooter className="flex justify-center gap-20">
        <SeasonCardFooterItem label="competitions" value={countComp} />
        <SeasonCardFooterItem label="matches" value={0} />
        <SeasonCardFooterItem label="won" value={0} />
        <SeasonCardFooterItem label="drawn" value={0} />
        <SeasonCardFooterItem label="lost" value={0} />
      </CardFooter>
    </Card>
  );
}

export default SeasonCard;
