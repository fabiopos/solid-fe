import NextMatch from "@/components/Dashboard/NextMatch/NextMatch";
import { DashboardFacade } from "@/facade/dashboard/DashboardFacade";
import { FulfilledMatch } from "@/features/match/domain/match.schema";
import { tryCatchAsync } from "rambdax";
import React from "react";

const LIMIT = 1;

async function NextMatchSection() {
  const { nextMatches } = await getData();
  return <NextMatch nextMatches={nextMatches} />;
}

async function getData() {
  const res = tryCatchAsync(
    DashboardFacade.getNextMatches,
    [] as FulfilledMatch[]
  );
  const nextMatches = await res(LIMIT);
  return { nextMatches };
}

export default NextMatchSection;
