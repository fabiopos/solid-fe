import {
  FulfilledMatch,
  FulfilledMatchExtended,
} from "@/features/match/domain/match.schema";
import React, { ReactNode, useMemo } from "react";
import MatchScoreBadge from "./MatchScore";
import TeamShieldAvatar from "../Team/TeamShield";

import { cn } from "@/lib/utils";
import { MapPin } from "lucide-react";
import MatchDayTime from "./MatchDayTime";

interface MatchRowProps {
  match: FulfilledMatch | null;
  actionsColumn?: ReactNode;
  onClickScore?: () => void;
}

function MatchRow({ match, actionsColumn, onClickScore }: MatchRowProps) {
  const matchIns = useMemo(() => {
    if (!match) return null;
    return new FulfilledMatchExtended(match);
  }, [match]);

  const hasScorers = useMemo(() => {
    return (matchIns?.scorers ?? []).length > 0;
  }, [matchIns]);

  if (!match) return null;
  // grid grid-cols-[150px_50px_210px_85px_210px_2fr]
  return (
    <div className="border rounded-xl my-2 bg-background">
      <div className="flex justify-start gap-2 pl-5 pt-2">
        <small className="dark:text-blue-200/40 text-muted-foreground">
          {match.title}
        </small>
      </div>

      <div className="grid grid-rows-2 grid-cols-[repeat(auto-fit,_minmax(100px,_1fr))] lg:grid-rows-1 justify-center items-center py-5">
        <div className="flex flex-col  row-start-1 col-start-1 lg:row-start-auto lg:col-start-auto justify-center items-center">
          <MatchDayTime matchDay={match.matchDay} matchHour={match.matchHour} />

          {/* <span className="text-center text-xs">{match.competition?.name}</span> */}
        </div>
        <div className="hidden  h-full justify-center items-center lg:flex">
          <span
            className={cn(
              "text-blue-400 font-normal text-sm",
              match.completed && "text-green-500"
            )}
          >
            {match.completed ? "Completed" : "Scheduled"}
          </span>
        </div>
        <div className="flex  h-full items-center row-start-2 lg:row-start-auto gap-5">
          <div className="flex flex-col w-full justify-center items-center text-center">
            <span className="font-extrabold tracking-wide leading-4">
              {match.homeTeam?.name}
            </span>
            <small className="text-gray-500">Home</small>
          </div>
          <TeamShieldAvatar src={match.homeTeam?.id} />
        </div>
        <div className="flex col-start-2 items-center h-full row-start-1 lg:col-start-auto lg:row-start-auto justify-center">
          <MatchScoreBadge match={match} onClick={onClickScore} />
        </div>
        <div className="flex row-start-2 h-full justify-center items-center lg:row-start-auto gap-5">
          <TeamShieldAvatar src={match.awayTeam?.id} />
          <div className="flex flex-col justify-center items-center">
            <span className="font-extrabold tracking-wide leading-4">
              {match.awayTeam?.name}
            </span>
            <small className="text-gray-500">Away</small>
          </div>
        </div>
        <div className="flex-col h-full justify-center items-center lg:flex-row gap-5 hidden lg:flex">
          {actionsColumn}
        </div>
      </div>

      <div className="flex justify-between items-center gap-5 px-10 pb-2">
        <div>
          {hasScorers && <small>Goals</small>}
          <div className="flex gap-2">
            {matchIns?.scorers.map((pyr, idx) => (
              <small
                className="dark:text-blue-200/40 text-muted-foreground capitalize"
                key={`match-apps-${idx}`}
              >
                {pyr.name} (<span className="lowercase">x</span>{pyr.goals})
              </small>
            ))}
            {!hasScorers && (
              <small className="dark:text-blue-200/40 text-muted-foreground">
                -
              </small>
            )}
          </div>
        </div>
        <div className="flex gap-2">
          <MapPin
            size={15}
            className="dark:text-blue-200/40 text-muted-foreground"
          />
          <small className="dark:text-blue-200/40 text-muted-foreground">
            {match.location}
          </small>
        </div>
      </div>
    </div>
  );
}

export default MatchRow;
