"use client";
import { usePlayersStore } from "@/context/PlayersCtx";
import { useAccessToken } from "@/hooks/use-access-token";
import { useTeamId } from "@/hooks/use-team-id";
import { useEffect } from "react";
import PlayerItem from "./PlayerItem";
import { Card } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { Alert } from "@/components/ui/alert";

export default function PlayerList() {
  const teamId = useTeamId();
  const access_token = useAccessToken();
  const { error, fetchPlayersStatus, fetchPlayers, players } = usePlayersStore(
    (state) => state
  );

  useEffect(() => {
    if (teamId && access_token) fetchPlayers(teamId, access_token);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [teamId, access_token]);

  if (fetchPlayersStatus === "IN_PROGRESS")
    return (
      <div className="flex items-center space-x-4">
        <Skeleton className="h-12 w-12 rounded-full" />
        <div className="space-y-2">
          <Skeleton className="h-4 w-[250px]" />
          <Skeleton className="h-4 w-[200px]" />
        </div>
      </div>
    );

  if (error) return <Alert variant="destructive">{error}</Alert>;

  return (
    <Card className="w-[500px]">
      {players.map((player) => (
        <PlayerItem key={player.id} player={player} />
      ))}
    </Card>
  );
}
