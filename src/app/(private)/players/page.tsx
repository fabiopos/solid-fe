import { auth } from "@/auth";
import { fieldPositionsQueryOptions } from "@/core/query/field-positions/fieldPositions.query";
import { playerWithStatsQueryOptions } from "@/core/query/player/player.query";
import PlayersFt from "@/features/players/infraestructure/Players/PlayersFt";
import { getQueryClient } from "@/lib/query-client";
import { dehydrate, HydrationBoundary } from "@tanstack/react-query";

async function PlayersPage() {
  const session = await auth();
  const queryClient = getQueryClient();
  await queryClient.prefetchQuery(
    playerWithStatsQueryOptions(session?.user.tid)
  );

  await queryClient.prefetchQuery(
    fieldPositionsQueryOptions(session?.user.access_token)
  );

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <PlayersFt />
    </HydrationBoundary>
  );
}

export default PlayersPage;
