import { CardTitle } from "@/components/ui/card";
import React from "react";
import SeasonActionTriggerIcon from "./SeasonActionTriggerIcon";
import { format } from "date-fns";
import { FulfilledSeason } from "../../domain/season.schema";
import SeasonStatusBadge from "@/components/Season/SeasonStatusBadge";
import Link from "next/link";

interface SeasonCardHeaderProps {
  season: FulfilledSeason;
}
function SeasonCardHeader(props: SeasonCardHeaderProps) {
  const { season: s } = props;
  return (
    <>
      <div className="flex justify-between">
        <div className="flex items-center gap-5">
          <CardTitle>
            <Link href={`/seasons/${s.id}`}>{s.name}</Link>
          </CardTitle>
          <SeasonStatusBadge status={s.status} />
        </div>

        <div>
          <SeasonActionTriggerIcon season={s} />
        </div>
      </div>
      <small>
        Desde{" "}
        <strong>{s.startDate && format(s.startDate, "dd MMM yyyy")}</strong>{" "}
        hasta <strong>{s.endDate && format(s.endDate, "dd MMM yyyy")}</strong>
      </small>
    </>
  );
}

export default SeasonCardHeader;
