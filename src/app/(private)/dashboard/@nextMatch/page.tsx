import NextMatch from "@/components/Dashboard/NextMatch/NextMatch";
import { DashboardFacade } from "@/facade/dashboard/DashboardFacade";
import React from "react";

const LIMIT = 1;

async function NextMatchSection() {
  const { nextMatches } = await getData();
  return <NextMatch nextMatches={nextMatches} />;
}

async function getData() {
  const nextMatches = await DashboardFacade.getNextMatches(LIMIT);
  return { nextMatches };
}

export default NextMatchSection;
