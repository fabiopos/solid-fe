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
  const { match, aparitions, players } = await getMatchDetails(matchId);

  if (match === null) return null;

  return (
    <PlayersStoreProvider>
      <MatchDetailsStoreProvider
        players={players}
        aparitions={aparitions}
        match={match}
      >
        <MatchDetails />
      </MatchDetailsStoreProvider>
    </PlayersStoreProvider>
  );
}

async function getMatchDetails(matchId: string) {
  const session = await auth();
  if (!session) return { match: null };

  const token = session.user.access_token;

  const apiClient = new ApiClient();
  const matchGet = new MatchGet(apiClient);
  const match = await matchGet.find(matchId, token);

  const aparitionGet = new AparitionGet(apiClient);

  const aparitions = await aparitionGet.getAparitions(matchId, token);
  // console.log(matchId, aparitions);

  let homeTeamPlayers: PlayerType[] = [];
  let awayTeamPlayers: PlayerType[] = [];

  const playerGet = new PlayerGet(apiClient);

  if (match?.homeTeamId) {
    homeTeamPlayers = await playerGet.getAllPlayers(match?.homeTeamId, token);
  }
  if (match?.awayTeamId) {
    awayTeamPlayers = await playerGet.getAllPlayers(match?.awayTeamId, token);
  }

  return { match, aparitions, players: { homeTeamPlayers, awayTeamPlayers } };
}
export default MatchDetailsPage;
