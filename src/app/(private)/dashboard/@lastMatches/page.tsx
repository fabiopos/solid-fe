import { DashboardFacade } from "@/facade/dashboard/DashboardFacade";
import LastMatchesFt from "@/features/dashboard/infraestructure/LastMatchesFt";
import { FulfilledMatch } from "@/features/match/domain/match.schema";
import { tryCatchAsync } from "rambdax";

async function LastMatchesSection() {
  const { lastMatches } = await getData();
  return <LastMatchesFt lastMatches={lastMatches} />;
}

async function getData() {
  const res = tryCatchAsync(
    DashboardFacade.getLastMatches,
    [] as FulfilledMatch[]
  );

  const lastMatches = await res(undefined);
  return { lastMatches };
}

export default LastMatchesSection;
