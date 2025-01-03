import { getCookieTeamId } from "@/app/actions";
import { auth } from "@/auth";
import { DashboardGet } from "@/features/dashboard/application/DashboardGet";
import { ApiClient } from "@/lib/ApiClient";
import { format, formatDistanceToNowStrict } from "date-fns";
import React from "react";

const LIMIT = 1;
async function NextMatch() {
  const { nextMatches } = await getData();

  if (nextMatches.length === 0)
    return (
      <div className="p-5">
        <i className="text-xs text-muted-foreground">
          No next match scheduled.
        </i>
      </div>
    );
  return (
    <div className="">
      <div className="px-5 my-5">
        <h3 className="text-lg font-bold tracking-tight text-primary max-lg:text-center">
          Next Match
        </h3>
      </div>
      <div className="p-5 space-y-5">
        {nextMatches.map((m) => (
          <div className="flex flex-col" key={`last-match-${m.id}`}>
            <span className="font-bold text-lg">
              {m.homeTeam?.name} vs {m.awayTeam?.name}
            </span>
            <span className="text-xs text-muted-foreground text-slate-300">
              {m.matchDay && format(m.matchDay, "PPP")} - {m.location}
              {/* Saturday October 22, 2024, Compensar Stadium */}
            </span>
            <span className="text-xs text-muted-foreground text-slate-300">
              {m.matchDay && formatDistanceToNowStrict(m.matchDay)} left
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

  if (!session) return { nextMatches: [] };
  if (!teamId) return { nextMatches: [] };

  const client = new DashboardGet(new ApiClient());
  const nextMatches = await client.getNextMatches(
    teamId,
    session.user.access_token,
    LIMIT
  );
  return { nextMatches };
}

export default NextMatch;
