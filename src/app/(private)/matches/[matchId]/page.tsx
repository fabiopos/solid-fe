import { getCookieTeamId } from "@/app/actions";
import { auth } from "@/auth";
import { MatchDetailsStoreProvider } from "@/context/MatchDetailsCtx";
import { PlayersStoreProvider } from "@/context/PlayersCtx";
import { AparitionGet } from "@/features/aparition/application/AparitionGet";
import { MatchGet } from "@/features/match/application/MatchGet";
import MatchDetails from "@/features/match/infraestructure/MatchDetails/MatchDetails";
import { PlayerGet } from "@/features/players/application/PlayerGet";
import { PlayerType } from "@/features/players/domain/player.schema";
import { ApiClient } from "@/lib/ApiClient";

async function MatchDetailsPage({ params }: { params: { matchId: string } }) {
  const { matchId } = await params;
  const { match, aparitions, players, selectedTeamId, allPlayers } = await getMatchDetails(
    matchId
  );

  if (match === null) return null;

  return (
    <PlayersStoreProvider players={allPlayers}>
      <MatchDetailsStoreProvider
        players={players}
        aparitions={aparitions}
        match={match}
        teamId={selectedTeamId}
      >
        <MatchDetails />
      </MatchDetailsStoreProvider>
    </PlayersStoreProvider>
  );
}

async function getMatchDetails(matchId: string) {
  const selectedTeamId = await getCookieTeamId();
  const session = await auth();
  if (!session) return { match: null };

  const token = session.user.access_token;

  const apiClient = new ApiClient();
  const matchGet = new MatchGet(apiClient);
  const match = await matchGet.find(matchId, token);

  /// all players
  let allPlayers: PlayerType[] = [];
  const client = new PlayerGet(apiClient);

  if (selectedTeamId) {
    allPlayers = await client.getAllPlayers(
      selectedTeamId,
      session?.user.access_token
    );
  }

  const aparitionGet = new AparitionGet(apiClient);

  const aparitions = await aparitionGet.getAparitions(matchId, token);

  let homeTeamPlayers: PlayerType[] = [];
  let awayTeamPlayers: PlayerType[] = [];

  const playerGet = new PlayerGet(apiClient);

  if (match?.homeTeamId) {
    homeTeamPlayers = await playerGet.getAllPlayers(match?.homeTeamId, token);
  }
  if (match?.awayTeamId) {
    awayTeamPlayers = await playerGet.getAllPlayers(match?.awayTeamId, token);
  }

  return {
    match,
    aparitions,
    players: { homeTeamPlayers, awayTeamPlayers },
    selectedTeamId,
    allPlayers,
  };
}
export default MatchDetailsPage;
