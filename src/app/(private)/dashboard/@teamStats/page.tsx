import { DashboardFacade } from "@/facade/dashboard/DashboardFacade";
import TeamStats from "@/features/dashboard/infraestructure/TeamStats";
import { tryCatchAsync } from "rambdax";

async function TeamStatsSection() {
  const { stats } = await getData();
  if (!stats) return null;
  return <TeamStats stats={stats} />;
}

async function getData() {
  const res = tryCatchAsync(DashboardFacade.getTeamStats, null);
  const stats = await res(undefined);
  return { stats };
}
export default TeamStatsSection;
