import { getCookieTeamId } from "@/app/actions";
import { auth } from "@/auth";
import { Separator } from "@/components/ui/separator";
import { PlayersStoreProvider } from "@/context/PlayersCtx";
import { FieldPositionGet } from "@/features/fieldPosition/application/FieldPositionGet";
import { FulfilledFieldPosition } from "@/features/fieldPosition/domain/field-position.schema";
import { PlayerGet } from "@/features/players/application/PlayerGet";
import { FulfilledPlayer } from "@/features/players/domain/player.effect.schema";
import PlayersTable from "@/features/players/infraestructure/PlayersTable";
import { ApiClient } from "@/lib/ApiClient";
import Link from "next/link";

async function PlayersPage() {
  const { players, fieldPositions } = await getPlayers();
  return (
    <PlayersStoreProvider players={players} fieldPositions={fieldPositions}>
      <div className="">
        <div className="flex justify-between items-center space-y-5">
          <h2 className="text-3xl">All Players</h2>
          <Link
            href={`/players/new`}
            className="text-sm hover:underline hover:underline-offset-2"
          >
            Add New Player
          </Link>
        </div>
        <Separator className="my-5" />
        <PlayersTable />
      </div>
    </PlayersStoreProvider>
  );
}

interface GetPlayersResponse {
  players: FulfilledPlayer[];
  fieldPositions: FulfilledFieldPosition[];
}
const getPlayers = async (): Promise<GetPlayersResponse> => {
  const session = await auth();
  const teamId = await getCookieTeamId();

  if (!teamId) return { fieldPositions: [], players: [] };
  if (!session) return { fieldPositions: [], players: [] };

  const apiClient = new ApiClient();
  const client = new PlayerGet(apiClient);
  const fPos = new FieldPositionGet(apiClient);
  const players = await client.getAllPlayers(
    teamId,
    session?.user.access_token
  );

  const fieldPositions = await fPos.getAllFieldPositions(
    session.user.access_token
  );

  return { players, fieldPositions };
};

export default PlayersPage;
