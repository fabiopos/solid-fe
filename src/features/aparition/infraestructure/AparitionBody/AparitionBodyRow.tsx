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
import FieldPositionBodyCell from "./BodyCells/FieldPositionCell";
import PositionCategoryBadge from "@/components/Player/PositionCategoryBadge";
import PositionCategoryShortBadge from "@/components/Player/PositionCategoryShortBadge";
import { getFirstName, getLastName } from "@/lib/player.util";

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
    return `${getFirstName(player)} ${getLastName(player)}`;
  }, [player]);

  if (player?.id === undefined) return null;

  return (
    <React.Fragment>
      <FieldPositionBodyCell>
        <PositionCategoryShortBadge category={player.favPosition?.category} />
      </FieldPositionBodyCell>
      <AparitionBodyCell className="text-left">{playerName}</AparitionBodyCell>
      <ConfirmedCell playerId={player.id} confirmed={confirmed} />
      <PlayedCell playerId={player.id} played={played} />
      <YellowCardCell disabled={!played} playerId={player.id} yellowCards={yellowCards} />
      <RedCardCell disabled={!played} playerId={player.id} redCards={redCards} />
      <MinutesCell disabled={!played} playerId={player.id} minutes={minutes} />
      <GoalsCell disabled={!played} playerId={player.id} goals={goals} />
      <RatingCell disabled={!played} playerId={player.id} rating={rating} />
    </React.Fragment>
  );
}




export default AparitionBodyRow;
