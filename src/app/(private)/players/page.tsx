import { getCookieTeamId } from "@/app/actions";
import { auth } from "@/auth";
import { PlayersStoreProvider } from "@/context/PlayersCtx";
import { FieldPositionGet } from "@/features/fieldPosition/application/FieldPositionGet";
import { FulfilledFieldPosition } from "@/features/fieldPosition/domain/field-position.schema";
import { PlayerGet } from "@/features/players/application/PlayerGet";
import { FulfilledPlayerWithStats } from "@/features/players/domain/player.effect.schema";
import PlayersFt from "@/features/players/infraestructure/Players/PlayersFt";
import { ApiClient } from "@/lib/ApiClient";

async function PlayersPage() {
  const { players, fieldPositions, teamId } = await getPlayers();
  return (
    <PlayersStoreProvider
      players={players}
      fieldPositions={fieldPositions}
      teamId={teamId}
    >
      <PlayersFt />
    </PlayersStoreProvider>
  );
}

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

export default PlayersPage;
