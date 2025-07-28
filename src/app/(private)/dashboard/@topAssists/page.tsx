import { DashboardFacade } from "@/facade/dashboard/DashboardFacade";
import { FulfilledMatchAparition } from "@/features/aparition/domain/aparition.schema";
import TopAssistsFt from "@/features/dashboard/infraestructure/TopAssitsFt";
import { tryCatchAsync } from "rambdax";
import React from "react";

async function TopAssistsSection() {
  const { players } = await getData();
  return <TopAssistsFt players={players} />;
}

async function getData() {
  const res = tryCatchAsync(
    DashboardFacade.getTopAsists,
    [] as FulfilledMatchAparition[]
  );
  const players = await res("");
  return { players };
}

export default TopAssistsSection;
