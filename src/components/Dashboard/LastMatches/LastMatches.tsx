import { getCookieTeamId } from "@/app/actions";
import { auth } from "@/auth";
import { DashboardGet } from "@/features/dashboard/application/DashboardGet";
import MatchesShortResults from "@/features/match/infraestructure/MatchesShortResults/MatchesShortResults";
import { ApiClient } from "@/lib/ApiClient";
import { format, formatDistanceToNowStrict } from "date-fns";
import React from "react";

const LIMIT = 3;

async function LastMatches() {
  const { lastMatches } = await getData();
  return (
    <div className="">
      <div className="px-5 my-2 flex justify-between">
        <h3 className="text-xl font-bold tracking-tight dark:text-white max-lg:text-center">
          Last {LIMIT} Matches 
        </h3>
        <MatchesShortResults matches={lastMatches} />
      </div>

      <div className="p-5 space-y-5">
        
        {lastMatches.map((m) => (
          <div className="flex flex-col" key={`last-match-${m.id}`}>
            <span className="font-bold text-foreground/80">
              {m.homeTeam?.name} vs {m.awayTeam?.name}
            </span>
            <span className="text-xs dark:text-slate-300 text-muted-foreground">
              {m.matchDay && format(m.matchDay, "PPP")} - {m.location}
            </span>
            <span className="text-xs dark:text-slate-300 text-muted-foreground">
              {m.matchDay && formatDistanceToNowStrict(m.matchDay)} ago
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

async function getData() {
  const session = await auth();

  const teamId = await getCookieTeamId();

  if (!session) return { lastMatches: [] };
  if (!teamId) return { lastMatches: [] };

  const client = new DashboardGet(new ApiClient());
  const lastMatches = await client.getLastMatches(
    teamId,
    session.user.access_token,
    LIMIT
  );
  return { lastMatches };
}

export default LastMatches;
