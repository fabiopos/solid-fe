import { auth } from "@/auth";
import { H1 } from "@/components/ui/typograhpy";
import { MatchDetailsStoreProvider } from "@/context/MatchDetails";
import { PlayersStoreProvider } from "@/context/PlayersCtx";
import { AparitionGet } from "@/features/aparition/application/AparitionGet";
import { MatchGet } from "@/features/match/application/MatchGet";
import MatchDetails from "@/features/match/infraestructure/MatchDetails/MatchDetails";
import { ApiClient } from "@/lib/ApiClient";

async function MatchDetailsPage({ params }: { params: { matchId: string } }) {
  const { matchId } = await params;
  const { match, aparitions } = await getMatchDetails(matchId);

  if (match === null) return null;

  return (
    <PlayersStoreProvider>
      <MatchDetailsStoreProvider aparitions={aparitions} match={match}>
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

  return { match, aparitions };
}
export default MatchDetailsPage;
