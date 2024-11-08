"use client";
import { usePlayersStore } from "@/context/PlayersCtx";
import { useTeamId } from "@/hooks/use-team-id";
import { useSession } from "next-auth/react";
import { useParams } from "next/navigation";
import { useEffect, useMemo } from "react";

export const usePlayers = () => {
  const { position } = useParams();
  const teamId = useTeamId();
  const { data } = useSession();
  const { error, fetchPlayersStatus, fetchPlayers, players } = usePlayersStore(
    (state) => state
  );

  useEffect(() => {    
    if (!!teamId && !!data?.user.access_token) fetchPlayers(teamId, data.user.access_token);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [teamId, data]);

  const filteredPlayers = useMemo(() => {
    if (!position) return players;
    return players.filter(
      (x) =>
        x.favPosition?.category?.toUpperCase() ===
        (position as string).toUpperCase()
    );
  }, [players, position]);

  return {
    players: filteredPlayers,
    fetchPlayersStatus,
    error,
  };
};
