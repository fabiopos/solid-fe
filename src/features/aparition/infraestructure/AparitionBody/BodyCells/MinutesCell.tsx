import React, { useCallback } from "react";
import AparitionBodyCell from "../AparitionBodyCell";
import { Input } from "@/components/ui/input";
import { useMatchDetailsStore } from "@/context/MatchDetailsCtx";

interface MinutesCellProps {
  playerId: string;
  minutes?: number | null;
}
function MinutesCell({ playerId, minutes }: MinutesCellProps) {
  const setMinutes = useMatchDetailsStore((state) => state.setMinutes);

  const handleChange = useCallback(
    (value: string) => {
        setMinutes(playerId, Number(value));
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
        defaultValue={minutes ?? 0}
        onChange={(e) => handleChange(e.target.value)}
      />
    </AparitionBodyCell>
  );
}

export default MinutesCell;