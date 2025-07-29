import { DashboardFacade } from "@/facade/dashboard/DashboardFacade";
import TopScorersFt from "@/features/dashboard/infraestructure/TopScorersFt";
import { tryCatchAsync } from "rambdax";
import React from "react";

async function TopScorersSection() {
  const { players } = await getData();
  return <TopScorersFt players={players} />;
}

async function getData() {
  const res = tryCatchAsync(DashboardFacade.getTopScorers, []);
  const players = await res(undefined);
  return { players };
}
export default TopScorersSection;
