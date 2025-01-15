import React, { useCallback } from "react";
import AparitionBodyCell from "../AparitionBodyCell";
import { Input } from "@/components/ui/input";
import { useMatchDetailsStore } from "@/context/MatchDetailsCtx";

interface RedCardCellProps {
  playerId: string;
  redCards?: number | null;
  disabled?: boolean;
}
function RedCardCell({ playerId, redCards, disabled }: RedCardCellProps) {
  const setRedCards = useMatchDetailsStore((state) => state.setRedCards);

  const handleChange = useCallback((value: string) => {
    setRedCards(playerId, Number(value))
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [playerId]);
  return (
    <AparitionBodyCell>
      <Input
        type="number"
        max={1}
        step={1}
        min={0}
        defaultValue={redCards ?? 0}
        onChange={(e) => handleChange(e.target.value)}
        disabled={disabled}
      />
    </AparitionBodyCell>
  );
}

export default RedCardCell;