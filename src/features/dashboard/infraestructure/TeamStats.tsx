import { PieChartWinRate } from "@/components/Dashboard/TeamStats/PieChartWinRate";
import TeamStatBoxes from "@/components/Dashboard/TeamStats/TeamStatBoxes";
import { Separator } from "@/components/ui/separator";
import React from "react";
import { FulfilledTeamStats } from "../domain/teamStats.schema";

function TeamStats({ stats }: { stats: FulfilledTeamStats }) {
  return (
    <div className="">
      <div className="px-5 my-2">
        <h3 className="text-xl font-bold tracking-tight dark:text-white max-lg:text-center">
          My Team Stats
        </h3>
      </div>
      <div className="flex flex-col mt-5">
        {stats && <PieChartWinRate stats={stats} />}
        <Separator className="my-2" />
        {stats && <TeamStatBoxes stats={stats} />}
      </div>
    </div>
  );
}

export default TeamStats;
