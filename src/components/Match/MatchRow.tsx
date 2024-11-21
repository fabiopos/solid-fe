import { FulfilledMatch } from "@/features/match/domain/match.schema";
import React from "react";
import { ExternalLink } from "lucide-react";
import { Separator } from "../ui/separator";
import MatchScoreBadge from "./MatchScore";
import TeamShieldAvatar from "../Team/TeamShield";
import Link from "next/link";

interface MatchRowProps {
  match: FulfilledMatch | null;
}

function MatchRow({ match }: MatchRowProps) {
  if (!match) return null;
  return (
    <React.Fragment key={`match-${match.id}`}>
      <div className="rounded-xl pb-1">
        <div className="grid grid-cols-[150px_50px_200px_85px_200px_2fr] gap-2 justify-center items-center">
          <div className="">{match.competition?.name}</div>
          <div className="">
            <span className="text-green-500 font-extrabold">W</span>
          </div>
          <div className="flex items-center gap-5 justify-end">
            <div className="flex flex-col justify-center items-center">
              <span className="font-extrabold tracking-wide leading-4">
                {match.homeTeam?.name}
              </span>
              <small className="text-gray-500">Home</small>
            </div>
            <TeamShieldAvatar src={match.homeTeam?.id} />
          </div>
          <div className="flex justify-center">
            <MatchScoreBadge match={match} />
          </div>
          <div className="flex items-center gap-5 justify-start">
            <TeamShieldAvatar src={match.awayTeam?.id} />
            <div className="flex flex-col justify-center items-center">
              <span className="font-extrabold tracking-wide leading-4">
                {match.awayTeam?.name}
              </span>
              <small className="text-gray-500">Away</small>
            </div>
          </div>
          <div className="">
            <Link href={`/matches/${match.id}`} className="hover:text-blue-500">
              <ExternalLink size="18" />
            </Link>
          </div>
        </div>
      </div>
      <Separator className="my-4" />
    </React.Fragment>
  );
}

export default MatchRow;
