import { getCookieTeamId } from "@/app/actions";
import { auth } from "@/auth";
import { MatchStoreProvider } from "@/context/MatchCtx";
import { MatchGet } from "@/features/match/application/MatchGet";
import Matches from "@/features/match/infraestructure/Matches";
import { ApiClient } from "@/lib/ApiClient";

async function MatchesPage() {
  const { matches } = await getData();
  return (
    <MatchStoreProvider allMatches={matches}>
      <Matches />
    </MatchStoreProvider>
  );
}

const emptyState = {
  matches: [],
};

async function getData() {
  const session = await auth();
  const teamId = await getCookieTeamId();

  const apiClient = new ApiClient();

  const matchesGet = new MatchGet(apiClient);

  if (!session?.user.access_token) return emptyState;
  if (!teamId) return emptyState;

  const access_token = session?.user.access_token;

  const matches = await matchesGet.getByTeam(teamId, access_token);

  return {
    matches,
  };
}

export default MatchesPage;
