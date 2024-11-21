import { auth } from "@/auth";
import { CompetitionGet } from "@/features/competition/application/CompetitionGet";
import { ApiClient } from "@/lib/ApiClient";

async function CompetitionDetailsPage({
  params,
}: {
  params: { competitionId: string };
}) {
  const { competitionId } = await params;
  const competition = await getCompetitionDetails(competitionId);
  return <div>{competition?.name}</div>;
}

async function getCompetitionDetails(competitionId: string) {
  const session = await auth();
  const token = session?.user.access_token;
  if (!token) return null;

  const client = new CompetitionGet(new ApiClient());
  const result = await client.find(competitionId, token);
  return result;
}
export default CompetitionDetailsPage;
