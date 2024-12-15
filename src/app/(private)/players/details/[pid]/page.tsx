import { auth } from "@/auth";
import { PlayerDetailsStoreProvider } from "@/context/PlayerDetailsCtx";
import { PlayerGet } from "@/features/players/application/PlayerGet";
import PlayerDetailsFt from "@/features/players/infraestructure/Details/PlayerDetailsFt";
import { ApiClient } from "@/lib/ApiClient";

async function PlayerDetailsPage({ params }: { params: { pid: string } }) {
  const { pid } = await params;
  const { player } = await getData(pid);
  return (
    <PlayerDetailsStoreProvider player={player}>
      <PlayerDetailsFt />
    </PlayerDetailsStoreProvider>
  );
}

const getData = async (pid: string) => {
  const session = await auth();

  if (!session) return { player: null };

  const apiClient = new ApiClient();
  const pGet = new PlayerGet(apiClient);

  const player = await pGet.find(pid, session.user.access_token);

  return { player };
};

export default PlayerDetailsPage;
