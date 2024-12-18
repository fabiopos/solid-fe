import { getCookieTeamId } from "@/app/actions";
import { auth } from "@/auth";
import { H1 } from "@/components/ui/typograhpy";
import { CompetitionStoreProvider } from "@/context/CompetitionCtx";
import { MatchStoreProvider } from "@/context/MatchCtx";
import { CompetitionGet } from "@/features/competition/application/CompetitionGet";
import { MatchGet } from "@/features/match/application/MatchGet";
import CompetitionList from "@/features/seasons/infraestructure/List/CompetitionList";
import { ApiClient } from "@/lib/ApiClient";

async function MatchesPage() {
  const { competitions, matches } = await getData();
  return (
    <CompetitionStoreProvider allCompetitions={competitions} season={null}>
      <MatchStoreProvider allMatches={matches}>
        <>
          <H1>All Competitions</H1>
          <CompetitionList />
        </>
      </MatchStoreProvider>
    </CompetitionStoreProvider>
  );
}

const emptyState = {
  competitions: [],
  matches: [],
};

async function getData() {
  const session = await auth();
  const teamId = await getCookieTeamId();

  const apiClient = new ApiClient();

  const competitionsGet = new CompetitionGet(apiClient);
  const matchesGet = new MatchGet(apiClient);

  if (!session?.user.access_token) return emptyState;
  if (!teamId) return emptyState;

  const access_token = session?.user.access_token;

  const competitions = await competitionsGet.getAllByTeam(teamId, access_token);
  const matches = await matchesGet.getByTeam(teamId, access_token);

  return {
    competitions,
    matches,
  };
}
export default MatchesPage;
