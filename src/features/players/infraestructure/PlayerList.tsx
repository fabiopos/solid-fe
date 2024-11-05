"use client";
import PlayerItem from "./PlayerItem";
import { Card } from "@/components/ui/card";
import { Alert } from "@/components/ui/alert";
import { usePlayers } from "../domain/usePlayers";
import PlayersSkeleton from "./PlayersSkeleton";

export default function PlayerList() {
  const { error, fetchPlayersStatus, players } = usePlayers();

  if (fetchPlayersStatus === "IN_PROGRESS") return <PlayersSkeleton />;

  if (error) return <Alert variant="destructive">{error}</Alert>;

  return (
    <Card className="w-[600px]">
      {players.length === 0 && <Alert>No players for this position</Alert>}
      {players.map((player) => (
        <PlayerItem key={player.id} player={player} />
      ))}
    </Card>
  );
}
