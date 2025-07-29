import { DashboardFacade } from "@/facade/dashboard/DashboardFacade";
import LastMatchesFt from "@/features/dashboard/infraestructure/LastMatchesFt";
import { tryCatchAsync } from "rambdax";

async function LastMatchesSection() {
  const { lastMatches } = await getData();
  return <LastMatchesFt lastMatches={lastMatches} />;
}

async function getData() {
  const res = tryCatchAsync(DashboardFacade.getLastMatches, []);

  const lastMatches = await res(undefined);
  return { lastMatches };
}

export default LastMatchesSection;
