import { getCookieTeamId } from "@/app/actions";
import { auth } from "@/auth";
import { DashboardGet } from "@/features/dashboard/application/DashboardGet";
import { ApiClient } from "@/lib/ApiClient";
import { format, formatDistanceToNowStrict } from "date-fns";
import React from "react";

const LIMIT = 3;

async function LastMatches() {
  const { lastMatches } = await getData();
  return (
    <div className="p-2">
      <div className="px-5 my-5">
        <h3 className="text-lg font-bold tracking-tight text-white max-lg:text-center">
          Last {LIMIT} Matches
        </h3>
      </div>

      <div className="px-5 space-y-5">
        {lastMatches.map((m) => (
          <div className="flex flex-col" key={`last-match-${m.id}`}>
            <span className="font-bold text-lg">
              {m.homeTeam?.name} vs {m.awayTeam?.name}
            </span>
            <span className="text-sm text-slate-300">
              {m.matchDay && format(m.matchDay, 'PPP')} - {m.location}
              
              {/* Saturday October 22, 2024, Compensar Stadium */}
            </span>
            <span className="text-sm text-slate-300">{ m.matchDay && formatDistanceToNowStrict(m.matchDay)} ago</span>
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
