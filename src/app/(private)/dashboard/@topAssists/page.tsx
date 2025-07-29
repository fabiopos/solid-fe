import { DashboardFacade } from "@/facade/dashboard/DashboardFacade";
import TopAssistsFt from "@/features/dashboard/infraestructure/TopAssitsFt";
import { tryCatchAsync } from "rambdax";
import React from "react";

async function TopAssistsSection() {
  const { players } = await getData();
  return <TopAssistsFt players={players} />;
}

async function getData() {
  const res = tryCatchAsync(DashboardFacade.getTopAsists, []);
  const players = await res(undefined);
  return { players };
}

export default TopAssistsSection;
