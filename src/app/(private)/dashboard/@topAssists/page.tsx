import { DashboardFacade } from "@/facade/dashboard/DashboardFacade";
import TopAssistsFt from "@/features/dashboard/infraestructure/TopAssitsFt";
import React from "react";

async function TopAssistsSection() {
  const { players } = await getData();
  return <TopAssistsFt players={players} />;
}

async function getData() {
  const players = await DashboardFacade.getTopAsists();
  return { players };
}

export default TopAssistsSection;
