import React, { useCallback } from "react";
import AparitionBodyCell from "../AparitionBodyCell";
import { Input } from "@/components/ui/input";
import { useMatchDetailsStore } from "@/context/MatchDetailsCtx";

interface YellowCardCellProps {
  playerId: string;
  yellowCards?: number | null;
  disabled?: boolean;
}
function YellowCardCell({ playerId, yellowCards, disabled }: YellowCardCellProps) {
  const setYellowCards = useMatchDetailsStore((state) => state.setYellowCards);

  const handleChange = useCallback(
    (value: string) => {
      setYellowCards(playerId, Number(value));
    },
    [playerId]
  );

  return (
    <AparitionBodyCell>
      <Input
        type="number"
        max={2}
        step={1}
        min={0}
        defaultValue={yellowCards ?? 0}
        onChange={(e) => handleChange(e.target.value)}
        disabled={disabled}
      />
    </AparitionBodyCell>
  );
}

export default YellowCardCell;
