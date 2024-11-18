import { auth } from "@/auth";
import { SeasonStoreProvider } from "@/context/SeasonCtx";
import { SeasonGet } from "@/features/seasons/application/SeasonGet";
import Seasons from "@/features/seasons/infraestructure/Seasons";
import { ApiClient } from "@/lib/ApiClient";

const SeasonsPage = async () => {
  const seasons = await getData();
  return (
    <SeasonStoreProvider seasons={seasons}>
      <Seasons  />
    </SeasonStoreProvider>
  );
};

async function getData() {
  const session = await auth();

  const client = new SeasonGet(new ApiClient());

  if (!session?.user.access_token || !session?.user?.subscriptionId) return [];
  const subscriptionId = session?.user.subscriptionId;
  const access_token = session?.user.access_token;
  const seasons = await client.getAllSeasonsBySubscription(
    subscriptionId,
    access_token
  );
  return seasons ?? [];
}
export default SeasonsPage;
