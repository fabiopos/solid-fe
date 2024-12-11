import { getCookieTeamId } from "@/app/actions";
import { auth } from "@/auth";
import TopScorers from "@/components/Dashboard/TopScorers/TopScorers";
import { ApiClient } from "@/lib/ApiClient";
import { DashboardGet } from "../application/DashboardGet";
import TopAssists from "@/components/Dashboard/TopAsists/TopAsists";

const LIMIT = 5;
async function TopAssistsFt() {
    const { players } = await getData()
  return (
    <div className="p-2">
      <div className="px-5 my-2">
        <h3 className="text-lg font-bold tracking-tight text-white max-lg:text-center">
          Top {LIMIT} Assists
        </h3>
      </div>
      <div className="px-5">
        <TopAssists aparitions={players} />
      </div>
    </div>
  );
}

async function getData() {
  const session = await auth();

  const teamId = await getCookieTeamId();

  if (!session) return { players: [] };
  if (!teamId) return { players: [] };

  const client = new DashboardGet(new ApiClient());
  const players = await client.getTopAssists(
    teamId,
    session.user.access_token,
    LIMIT
  );
  return { players };
}

export default TopAssistsFt;
