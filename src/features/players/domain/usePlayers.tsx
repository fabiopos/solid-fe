"use client";
import { usePlayersStore } from "@/context/PlayersCtx";
import { useTeamId } from "@/hooks/use-team-id";
import { PlayerStatus } from "@/types/types.common";
import { useSession } from "next-auth/react";
import { useParams } from "next/navigation";
import { useCallback, useEffect, useMemo } from "react";

export const usePlayers = () => {
  const { position } = useParams();
  const teamId = useTeamId();
  const { data } = useSession();
  const {
    error,
    fetchPlayersStatus,
    fetchPlayers,
    players,
    setPlayerStatus,
    updatePlayer,
    playerStatusUpdate,
  } = usePlayersStore((state) => state);

  useEffect(() => {
    if (!!teamId && !!data?.user.access_token)
      fetchPlayers(teamId, data.user.access_token);
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

  const handleSetDown = useCallback(
    (playerId: string, newStatus: PlayerStatus) => {
      setPlayerStatus(playerId, newStatus);
      const player = players.find((x) => x.id === playerId);      

      if (!player) return;
      if (!data?.user.access_token) return;

      updatePlayer(playerId, { status: newStatus }, data?.user.access_token);
    },
    [players]
  );

  return {
    players: filteredPlayers,
    fetchPlayersStatus,
    playerStatusUpdate,
    error,
    handlers: {
      handleSetDown,
    },
  };
};
