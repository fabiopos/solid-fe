import { getCookieTeamId } from "@/app/actions";
import { auth } from "@/auth";
import { CompetitionStoreProvider } from "@/context/CompetitionCtx";
import { MatchStoreProvider } from "@/context/MatchCtx";
import { SeasonStoreProvider } from "@/context/SeasonCtx";
import { CompetitionGet } from "@/features/competition/application/CompetitionGet";
import { FulfilledCompetition } from "@/features/competition/domain/competition.schema";
import { MatchGet } from "@/features/match/application/MatchGet";
import { FulfilledMatch } from "@/features/match/domain/match.schema";
import { SeasonGet } from "@/features/seasons/application/SeasonGet";
import { FulfilledSeason } from "@/features/seasons/domain/season.schema";
import Seasons from "@/features/seasons/infraestructure/Seasons";
import { ApiClient } from "@/lib/ApiClient";

const SeasonsPage = async () => {
  const { seasons, competitions, matches } = await getData();
  return (
    <SeasonStoreProvider seasons={seasons}>
      <CompetitionStoreProvider season={null} allCompetitions={competitions}>
        <MatchStoreProvider allMatches={matches}>
          <Seasons />
        </MatchStoreProvider>
      </CompetitionStoreProvider>
    </SeasonStoreProvider>
  );
};

interface SeasonPageDataProps {
  seasons: FulfilledSeason[];
  competitions: FulfilledCompetition[];
  matches: FulfilledMatch[];
  
}
const emptyState: SeasonPageDataProps = {
  seasons: [],
  competitions: [],
  matches: [],
  
};
async function getData(): Promise<SeasonPageDataProps> {
  const session = await auth();
  const teamId = await getCookieTeamId();

  const apiClient = new ApiClient();
  const client = new SeasonGet(apiClient);
  const competitionsGet = new CompetitionGet(apiClient);
  const matchesGet = new MatchGet(apiClient);
  

  if (!session?.user.access_token) return emptyState;
  if (!teamId) return emptyState;

  const access_token = session?.user.access_token;

  const seasons = await client.getAllByTeam(teamId, access_token);

  const competitions = await competitionsGet.getAllByTeam(teamId, access_token);
  const matches = await matchesGet.getByTeam(teamId, access_token);

  

  return {
    seasons,
    competitions,
    matches,
  
  };
}
export default SeasonsPage;
