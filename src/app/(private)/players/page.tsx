"use client";
import PlayersFt from "@/features/players/infraestructure/Players/PlayersFt";
import {
  useFetchFieldPositions,
  useFetchPlayers,
} from "@/hooks/players/players.hook";

function PlayersPage() {
  useFetchFieldPositions();
  const { error, isLoading } = useFetchPlayers();
  if (isLoading) return <>Loading...</>;
  if (error) return <>Error {JSON.stringify(error)}</>;
  return <PlayersFt />;
  //return <>{players?.length}</>;
}

export default PlayersPage;
