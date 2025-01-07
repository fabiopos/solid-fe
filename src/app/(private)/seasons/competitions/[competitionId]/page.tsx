import { auth } from "@/auth";
import { MatchStoreProvider } from "@/context/MatchCtx";
import { CompetitionGet } from "@/features/competition/application/CompetitionGet";
import { FulfilledMatch } from "@/features/match/domain/match.schema";
import Matches from "@/features/match/infraestructure/Matches";
import { ApiClient } from "@/lib/ApiClient";

async function CompetitionDetailsPage({
  params,
}: {
  params: { competitionId: string };
}) {
  const { competitionId } = await params;
  const result = await getCompetitionDetails(competitionId);

  if (!result) return <>Error retrieving competition</>;

  return (
    <div className="">
     

      <MatchStoreProvider allMatches={result.matches}>
        <Matches />
      </MatchStoreProvider>
    </div>
  );
}

async function getCompetitionDetails(competitionId: string) {
  const session = await auth();
  const token = session?.user.access_token;
  if (!token) return null;

  const client = new CompetitionGet(new ApiClient());
  const competition = await client.find(competitionId, token);

  const matches = (competition?.matches ?? []) as FulfilledMatch[];

  const mappedMatches = matches.map((x) => ({
    ...x,
    competition: {
      id: competition.id,
      name: competition.name,
      status: competition.status,
    },
  }));

  return { competition, matches: mappedMatches };
}
export default CompetitionDetailsPage;
