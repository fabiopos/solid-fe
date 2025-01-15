import { auth } from "@/auth";
import { Separator } from "@/components/ui/separator";
import { CompetitionStoreProvider } from "@/context/CompetitionCtx";
import { MatchStoreProvider } from "@/context/MatchCtx";
import { SeasonDetailStoreProvider } from "@/context/SeasonDetailsCtx";
import { MatchGet } from "@/features/match/application/MatchGet";
import { SeasonGet } from "@/features/seasons/application/SeasonGet";
import SeasonDetails from "@/features/seasons/infraestructure/Details/SeasonDetails";
import { ApiClient } from "@/lib/ApiClient";

type SeasonDetailsPageProps = Promise<{ seasonId: string }>;

export default async function SeasonDetailsPage(props: {
  params: SeasonDetailsPageProps;
}) {
  const { seasonId } = await props.params;
  const season = await getSeasonDetails(seasonId);
  const matches = await getSeasonMatches(seasonId);
  return (
    <SeasonDetailStoreProvider season={season} matches={matches}>
      <CompetitionStoreProvider season={season}>
        <MatchStoreProvider allMatches={matches}>
          <div>
            <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl w-full">
              Season Details
            </h1>
            <Separator className="my-5" />
            <p className="tracking-wide text-lg">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. At quos,
              ullam dignissimos magnam numquam consectetur consequatur veniam ut
              praesentium perferendis tenetur ea, fugit culpa aspernatur et
            </p>
            <SeasonDetails />
          </div>
        </MatchStoreProvider>
      </CompetitionStoreProvider>
    </SeasonDetailStoreProvider>
  );
}

async function getSeasonDetails(seasonId: string) {
  const session = await auth();
  const token = session?.user.access_token;
  const client = new SeasonGet(new ApiClient());
  if (!token) return null;
  const seasonDetails = await client.findSeason(seasonId, token);
  return seasonDetails;
}

async function getSeasonMatches(seasonId: string) {
  const session = await auth();
  const token = session?.user.access_token;
  const client = new MatchGet(new ApiClient());
  if (!token) return null;
  const matches = await client.getBySeason(seasonId, token);
  return matches;
}
