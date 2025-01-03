import { getCookieTeamId } from "@/app/actions";
import { auth } from "@/auth";
import { NewPlayerStoreProvider } from "@/context/NewPlayerCtx";
import { PlayersStoreProvider } from "@/context/PlayersCtx";
import { FieldPositionGet } from "@/features/fieldPosition/application/FieldPositionGet";
import { FulfilledFieldPosition } from "@/features/fieldPosition/domain/field-position.schema";
import { PlayerGet } from "@/features/players/application/PlayerGet";
import { FulfilledPlayer } from "@/features/players/domain/player.effect.schema";
import NewPlayer from "@/features/players/infraestructure/NewPlayer/NewPlayer";
import { ApiClient } from "@/lib/ApiClient";

async function NewPlayerPage() {
  const { fieldPositions, players, teamId } = await getPlayers();
  return (
    <PlayersStoreProvider
      fieldPositions={fieldPositions}
      players={players}
      teamId={teamId}
    >
      <NewPlayerStoreProvider>
        <NewPlayer />
      </NewPlayerStoreProvider>
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

export default NewPlayerPage;
