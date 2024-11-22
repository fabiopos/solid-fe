import { auth } from "@/auth";
import { H1 } from "@/components/ui/typograhpy";
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
      <H1>{result.competition.name}</H1>
      <br />
      <p>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Nulla veritatis
        adipisci harum nemo minima, et facere eaque tempore numquam ad quos
        magnam, quam iure sequi quod sed nostrum commodi cumque modi id ratione
        culpa magni. Consequatur modi quidem corporis laboriosam maxime eaque
        iusto alias facere, facilis, dolorem fugit ex similique voluptatum
        eveniet dignissimos ratione neque praesentium inventore laudantium
        impedit? Quam ad, vero ipsam iusto ducimus quasi aliquid voluptatum
        tempore dicta accusantium aliquam ipsum sed deleniti quos fugit ullam
        officia doloremque, architecto consequatur maxime quis. Architecto,
        maiores exercitationem. Nesciunt id, laborum iste suscipit sint aperiam
        doloribus veniam ex ducimus voluptas tempora!
      </p>

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
