import { format } from "date-fns";
import React, { useMemo } from "react";

interface MatchDayTimeProps {
  matchDay?: Date | string | null;
  matchHour?: Date | string | null;
}

export default function MatchDayTime({
  matchDay,
  matchHour,
}: MatchDayTimeProps) {
  
  const day = useMemo(() => {
    if (!matchDay) return;
    if (typeof matchDay === "string") return format(matchDay, "dd");
    return typeof matchDay === 'object' && format(matchDay, "dd");
  }, [matchDay]);

  return (
    <>
      {!matchDay && <small>no date specified</small>}
      <span className="text-4xl">{day}</span>
      <span className="text-sm">{matchDay && format(matchDay, "MMM")}</span>
      <span className="text-sm">{matchHour && format(matchHour, "HH:mm")}</span>
    </>
  );
}
