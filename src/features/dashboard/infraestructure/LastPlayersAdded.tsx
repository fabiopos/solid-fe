import { getCookieTeamId } from "@/app/actions";
import { auth } from "@/auth";
import LastPlayersAdded from "@/components/Dashboard/LastPlayersAdded/LastPlayersAdded";
import { DashboardGet } from "../application/DashboardGet";
import { ApiClient } from "@/lib/ApiClient";
const LIMIT = 8;

async function LastPlayersAddedFt() {
  const { players } = await getData();

  return (
    <div className="p-2">
      <div className="px-5 my-5">
        <h3 className="text-lg font-bold tracking-wide text-white max-lg:text-center">
          Last {LIMIT} Players Added
        </h3>
      </div>
      <div className="px-5 mt-5">
        <LastPlayersAdded players={players} />
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
  const players = await client.getLastPlayersAdded(
    teamId,
    session.user.access_token,
    LIMIT
  );
  return { players };
}

export default LastPlayersAddedFt;
