import { getCookieTeamId } from "@/app/actions";
import { auth } from "@/auth";
import { PlayerDetailsStoreProvider } from "@/context/PlayerDetailsCtx";
import { PlayersStoreProvider } from "@/context/PlayersCtx";
import { FieldPositionGet } from "@/features/fieldPosition/application/FieldPositionGet";
import { FulfilledFieldPosition } from "@/features/fieldPosition/domain/field-position.schema";
import { PlayerGet } from "@/features/players/application/PlayerGet";
import { FulfilledPlayer, FulfilledPlayerWithStats } from "@/features/players/domain/player.effect.schema";
import PlayerDetailsFt from "@/features/players/infraestructure/Details/PlayerDetailsFt";
import { ApiClient } from "@/lib/ApiClient";

async function PlayerDetailsPage({ params }: { params: { pid: string } }) {
  const { pid } = await params;
  const { player } = await getData(pid);
  const { fieldPositions, players, teamId } = await getPlayers();
  return (
    <PlayersStoreProvider fieldPositions={fieldPositions} players={players} teamId={teamId}>
      <PlayerDetailsStoreProvider player={player}>
        <PlayerDetailsFt />
      </PlayerDetailsStoreProvider>
    </PlayersStoreProvider>
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

interface GetPlayersResponse {
  players: FulfilledPlayerWithStats[];
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
  const players = await client.getAllPlayersWithStats(
    teamId,
    session?.user.access_token
  );

  const fieldPositions = await fPos.getAllFieldPositions(
    session.user.access_token
  );

  return { players, fieldPositions, teamId };
};

export default PlayerDetailsPage;
