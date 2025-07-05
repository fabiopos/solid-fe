"use client";
import { usePlayersStore } from "@/context/PlayersCtx";
import { useToast } from "@/hooks/use-toast";
import { PlayerStatus } from "@/types/types.common";
import { useSession } from "next-auth/react";
import { useParams, useRouter } from "next/navigation";
import { useCallback, useEffect, useMemo } from "react";

export const usePlayers = () => {
  const router = useRouter();
  const { toast } = useToast();
  const { position } = useParams();
  const { data } = useSession();
  const {
    error,
    fetchPlayersStatus,
    players,
    setPlayerStatus,
    setPlayerInactive,
    updatePlayer,
    deletePlayer,
    playerStatusUpdate,
    playerStatusDelete,
  } = usePlayersStore((state) => state);

  const filteredPlayers = useMemo(() => {
    if (!position) return players;
    return players.filter(
      (x) =>
        x.favPosition?.category?.toUpperCase() ===
        (position as string).toUpperCase()
    );
  }, [players, position]);

  const handleSetDown = useCallback(
    (playerId: string | undefined, newStatus: PlayerStatus) => {
      if (!playerId) return;
      // setPlayerStatus(playerId, newStatus);
      const player = players.find((x) => x.id === playerId);

      if (!player) return;
      if (!data?.user.access_token) return;

      updatePlayer(playerId, { status: newStatus }, data?.user.access_token);
    },
    [data?.user.access_token, players, setPlayerStatus, updatePlayer]
  );

  const handleSetInactive = useCallback(
    (playerId: string | undefined, active: boolean) => {
      if (!playerId) return;
      setPlayerInactive(playerId, active);

      const player = players.find((x) => x.id === playerId);

      if (!player) return;
      if (!data?.user.access_token) return;

      updatePlayer(playerId, { active }, data?.user.access_token);
    },
    [data?.user.access_token, players, setPlayerInactive, updatePlayer]
  );

  const handleDelete = useCallback(
    (playerId: string | undefined) => {
      if (!playerId) return;
      deletePlayer(playerId, data?.user.access_token ?? "");
      router.refresh();
    },
    [data?.user.access_token, deletePlayer, router]
  );

  useEffect(() => {
    if (playerStatusDelete.status === "ERROR") {
      toast({
        title: "Cannot delete the player",
        description: "Make sure player has not apartitions in matches",
        variant: "destructive",
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [playerStatusDelete]);

  useEffect(() => {
    if (playerStatusDelete.status === "DONE") {
      toast({
        title: "The player has been deleted successfuly",
        description: "This operation cannot be undone",
      });
      router.refresh();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [playerStatusDelete]);

  return {
    players: filteredPlayers,
    fetchPlayersStatus,
    playerStatusUpdate,
    playerStatusDelete,
    error,
    handlers: {
      handleSetDown,
      handleDelete,
      handleSetInactive,
    },
  };
};
