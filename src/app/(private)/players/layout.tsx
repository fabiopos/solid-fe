import { getCookieTeamId } from "@/app/actions";
import { auth } from "@/auth";
import PlayersSidebar from "@/components/Player/PlayerSidebar/PlayersSidebar";
import { PlayersStoreProvider } from "@/context/PlayersCtx";
import { PlayerGet } from "@/features/players/application/PlayerGet";
import { PlayerType } from "@/features/players/domain/player.schema";
import { ApiClient } from "@/lib/ApiClient";

interface LayoutProps {
  children: React.ReactNode;
}

export default async function LayoutPlayers(props: LayoutProps) {
  const players = await getPlayers();
  return (
    <PlayersStoreProvider players={players as PlayerType[]}>
      <div className="flex gap-5 py-10">
        <aside className="">
          <PlayersSidebar />
        </aside>
        {props.children}
      </div>
    </PlayersStoreProvider>
  );
}

const getPlayers = async () => {
  const session = await auth();
  const teamId = await getCookieTeamId();

  if (!teamId) return;
  if (!session) return;

  const client = new PlayerGet(new ApiClient());
  const players = await client.getAllPlayers(
    teamId,
    session?.user.access_token
  );
  return players;
};
