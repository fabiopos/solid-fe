import React from "react";
import { PlayerType } from "../../domain/player.schema";
import { PlayerStatus } from "@/types/types.common";
import { Ambulance, ArrowDown, ArrowUp, Loader } from "lucide-react";
import { usePlayersStore } from "@/context/PlayersCtx";
import { useNewPlayerStore } from "@/context/NewPlayerCtx";

interface StatusCellProps {
  player: PlayerType;
}
const StatusCell = ({ player }: StatusCellProps) => {
  const { playerStatusUpdate, playerStatusDelete } = usePlayersStore(
    (state) => state
  );

  if (
    playerStatusUpdate.id === player.id &&
    playerStatusUpdate.status === "IN_PROGRESS"
  )
    return (
      <>
        <Loader className="animate-spin" />
      </>
    );

  if (
    playerStatusDelete.id === player.id &&
    playerStatusDelete.status === "IN_PROGRESS"
  )
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
