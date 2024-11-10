import React from "react";
import { PlayerType } from "../../domain/player.schema";
import { PlayerStatus } from "@/types/types.common";
import { Ambulance, ArrowDown, ArrowUp, Loader } from "lucide-react";
import { usePlayersStore } from "@/context/PlayersCtx";

interface StatusCellProps {
  player: PlayerType;
}
const StatusCell = ({ player }: StatusCellProps) => {
  const { id, status } = usePlayersStore((state) => state.playerStatusUpdate);

  if (id === player.id && status === "IN_PROGRESS")
    return (
      <>
        <Loader className="animate-spin" />
      </>
    );
  return (
    <>
      {player.status === PlayerStatus.OK && (
        <ArrowUp className="text-green-600" />
      )}
      {player.status === PlayerStatus.INJURIED && (
        <Ambulance className="text-red-400" />
      )}

      {player.status === PlayerStatus.DOWN && (
        <ArrowDown className="text-red-400" />
      )}
    </>
  );
};

export default StatusCell;
