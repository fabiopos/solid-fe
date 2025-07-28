import { getCookieTeamId } from "@/app/actions";
import { auth } from "@/auth";
import { DashboardGet } from "@/features/dashboard/application/DashboardGet";
import TeamStats from "@/features/dashboard/infraestructure/TeamStats";
import { ApiClient } from "@/lib/ApiClient";

async function TeamStatsSection() {
  const { stats } = await getData();
  if (!stats) return null;
  return <TeamStats stats={stats} />;
}

async function getData() {
  try {
    const session = await auth();
    const client = new DashboardGet(new ApiClient());
    const teamId = await getCookieTeamId();

    if (!teamId) return { stats: null };
    if (!session) return { stats: null };

    const stats = await client.getTeamStats(
      teamId,
      session?.user.access_token ?? ""
    );
    return { stats };
  } catch (error) {
    console.log(error);
    return { stats: null };
  }
}
export default TeamStatsSection;
