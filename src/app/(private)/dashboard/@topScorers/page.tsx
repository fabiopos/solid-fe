import { DashboardFacade } from "@/facade/dashboard/DashboardFacade";
import TopScorersFt from "@/features/dashboard/infraestructure/TopScorersFt";
import React from "react";

async function TopScorersSection() {
  const { players } = await getData();
  return <TopScorersFt players={players} />;
}

async function getData() {
  try {
    const players = await DashboardFacade.getTopScorers();
    return { players };
  } catch (error) {
    console.log(error);
    return { players: [] };
  }
}
export default TopScorersSection;
