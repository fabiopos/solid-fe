import { auth } from "@/auth";
import { fieldPositionsQueryOptions } from "@/core/query/field-positions/fieldPositions.query";
import { playerWithStatsQueryOptions } from "@/core/query/player/player.query";
import PlayersFt from "@/features/players/infraestructure/Players/PlayersFt";
// import {
//   useFetchFieldPositions,
//   useFetchPlayers,
// } from "@/hooks/players/players.hook";
import { getQueryClient } from "@/lib/query-client";
import { dehydrate, HydrationBoundary } from "@tanstack/react-query";

export async function getQueryProps() {
  const session = await auth();
  const queryClient = getQueryClient();
  await queryClient.prefetchQuery(
    playerWithStatsQueryOptions(session?.user.tid)
  );

  await queryClient.prefetchQuery(
    fieldPositionsQueryOptions(session?.user.access_token)
  );

  return {
    dehydratedState: dehydrate(queryClient),
  };
}
async function PlayersPage() {
  const { dehydratedState } = await getQueryProps();
  return (
    <HydrationBoundary state={dehydratedState}>
      <PlayersFt />
    </HydrationBoundary>
  );
}

export default PlayersPage;
