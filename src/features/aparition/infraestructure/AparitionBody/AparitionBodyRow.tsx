import React, { useMemo } from "react";
import AparitionBodyCell from "./AparitionBodyCell";
import { FulfilledPlayer } from "@/features/players/domain/player.effect.schema";
import { Switch } from "@/components/ui/switch";
import { Input } from "@/components/ui/input";

import ConfirmedCell from "./BodyCells/ConfirmedCell";
import PlayedCell from "./BodyCells/PlayedCell";
import YellowCardCell from "./BodyCells/YellowCardCell";
import RedCardCell from "./BodyCells/RedCardCell";
import MinutesCell from "./BodyCells/MinutesCell";
import GoalsCell from "./BodyCells/GoalsCell";
import RatingCell from "./BodyCells/Rating";

interface AparitionBodyRowProps {
  player: FulfilledPlayer;
  confirmed?: boolean | null;
  played?: boolean | null;
  yellowCards?: number | null;
  redCards?: number | null;
  minutes?: number | null;
  goals?: number | null;
  rating?: number | null;
}

function AparitionBodyRow({
  player,
  confirmed,
  played,
  yellowCards,
  redCards,
  goals,
  minutes,
  rating,
}: AparitionBodyRowProps) {
  const playerName = useMemo(() => {
    return `${player.firstName} ${player.lastName}`;
  }, [player]);

  if (player?.id === undefined) return null;
  
  return (
    <React.Fragment>
      <AparitionBodyCell>{playerName}</AparitionBodyCell>
      <ConfirmedCell playerId={player.id} confirmed={confirmed} />
      <PlayedCell playerId={player.id} played={played} />
      <YellowCardCell playerId={player.id} yellowCards={yellowCards} />
      <RedCardCell playerId={player.id} redCards={redCards} />
      <MinutesCell playerId={player.id} minutes={minutes} />
      <GoalsCell playerId={player.id} goals={goals} />
      <RatingCell playerId={player.id} rating={rating} />
    </React.Fragment>
  );
}

export default AparitionBodyRow;
