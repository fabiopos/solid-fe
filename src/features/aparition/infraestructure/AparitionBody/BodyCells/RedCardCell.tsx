import React, { useCallback } from "react";
import AparitionBodyCell from "../AparitionBodyCell";
import { Input } from "@/components/ui/input";
import { useMatchDetailsStore } from "@/context/MatchDetailsCtx";

interface RedCardCellProps {
  playerId: string;
  redCards?: number | null;
}
function RedCardCell({ playerId, redCards }: RedCardCellProps) {
  const setRedCards = useMatchDetailsStore((state) => state.setRedCards);

  const handleChange = useCallback((value: string) => {
    setRedCards(playerId, Number(value))
  }, [playerId]);
  return (
    <AparitionBodyCell>
      <Input
        type="number"
        max={2}
        step={1}
        min={0}
        defaultValue={redCards ?? 0}
        onChange={(e) => handleChange(e.target.value)}
      />
    </AparitionBodyCell>
  );
}

export default RedCardCell;