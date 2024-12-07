import { PieChartWinRate } from "@/components/Dashboard/TeamStats/PieChartWinRate";
import TeamStatBoxes from "@/components/Dashboard/TeamStats/TeamStatBoxes";
import { Separator } from "@/components/ui/separator";
import React from "react";
import { DashboardGet } from "../application/DashboardGet";
import { ApiClient } from "@/lib/ApiClient";
import { getCookieTeamId } from "@/app/actions";
import { auth } from "@/auth";

async function TeamStats() {
  const session = await auth();
  const client = new DashboardGet(new ApiClient());
  const teamId = await getCookieTeamId();

  if (!teamId) return null;
  if (!session) return null;

  const stats = await client.getTeamStats(
    teamId,
    session?.user.access_token ?? ""
  );

  return (
    <div>
      <div className="mt-5">
        <h3 className="text-lg font-bold tracking-tight text-white max-lg:text-center">
          My Team Stats
        </h3>
      </div>
      <div className="flex flex-col mt-5">
        <PieChartWinRate stats={stats} />
        <Separator className="my-2" />
        <TeamStatBoxes stats={stats} />
      </div>
    </div>
  );
}

export default TeamStats;