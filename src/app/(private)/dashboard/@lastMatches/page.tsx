import { DashboardFacade } from "@/facade/dashboard/DashboardFacade";
import LastMatchesFt from "@/features/dashboard/infraestructure/LastMatchesFt";

async function LastMatchesSection() {
  const { lastMatches } = await getData();
  return <LastMatchesFt lastMatches={lastMatches} />;
}

async function getData() {
  try {
    const lastMatches = await DashboardFacade.getLastMatches();
    return { lastMatches };
  } catch (error) {
    console.log("Error =>", error);
    return { lastMatches: [] };
  }
}

export default LastMatchesSection;
