import { getCookieTeamId } from "@/app/actions";
import { auth } from "@/auth";
import { Separator } from "@/components/ui/separator";
import { PlayersStoreProvider } from "@/context/PlayersCtx";
import { FieldPositionGet } from "@/features/fieldPosition/application/FieldPositionGet";
import { FulfilledFieldPosition } from "@/features/fieldPosition/domain/field-position.schema";
import { PlayerGet } from "@/features/players/application/PlayerGet";
import { FulfilledPlayer } from "@/features/players/domain/player.effect.schema";
import PlayersFt from "@/features/players/infraestructure/Players/PlayersFt";
import { ApiClient } from "@/lib/ApiClient";
import Link from "next/link";

async function PlayersPage() {
  const { players, fieldPositions, teamId } = await getPlayers();
  return (
    <PlayersStoreProvider players={players} fieldPositions={fieldPositions} teamId={teamId}>
      <div className="">
        <div className="flex justify-between items-center space-y-5">
          <h2 className="text-3xl">All Players</h2>
          <Link
            href={`/players/new`}
            className="text-sm hover:underline hover:underline-offset-2 border p-2 bg-slate-500"
          >
            Add New Player
          </Link>
        </div>
        <Separator className="my-5" />
        <PlayersFt />
      </div>
    </PlayersStoreProvider>
  );
}

interface GetPlayersResponse {
  players: FulfilledPlayer[];
  fieldPositions: FulfilledFieldPosition[];
  teamId: string;
}
const getPlayers = async (): Promise<GetPlayersResponse> => {
  const session = await auth();
  const teamId = await getCookieTeamId();

  if (!teamId) return { fieldPositions: [], players: [], teamId: "" };
  if (!session) return { fieldPositions: [], players: [], teamId: "" };

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

  return { players, fieldPositions, teamId };
};

export default PlayersPage;
