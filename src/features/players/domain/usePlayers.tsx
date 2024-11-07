"use client";
import { usePlayersStore } from "@/context/PlayersCtx";
import { useAccessToken } from "@/hooks/use-access-token";
import { useTeamId } from "@/hooks/use-team-id";
import { useParams } from "next/navigation";
import { useEffect, useMemo } from "react";

export const usePlayers = () => {
  const { position } = useParams();
  const teamId = useTeamId();
  const access_token = useAccessToken();
  const { error, fetchPlayersStatus, fetchPlayers, players } = usePlayersStore(
    (state) => state
  );

  useEffect(() => {
    if (teamId && access_token) fetchPlayers(teamId, access_token);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [teamId, access_token]);

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
