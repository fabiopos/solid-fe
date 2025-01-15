import React, { useCallback } from "react";
import AparitionBodyCell from "../AparitionBodyCell";
import { Input } from "@/components/ui/input";
import { useMatchDetailsStore } from "@/context/MatchDetailsCtx";

interface MinutesCellProps {
  playerId: string;
  minutes?: number | null;
  disabled?: boolean;
}
function MinutesCell({ playerId, minutes, disabled }: MinutesCellProps) {
  const setMinutes = useMatchDetailsStore((state) => state.setMinutes);

  const handleChange = useCallback(
    (value: string) => {
        setMinutes(playerId, Number(value));
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [playerId]
  );

  return (
    <AparitionBodyCell>
      <Input
        type="number"
        max={120}
        step={1}
        min={0}
        defaultValue={minutes ?? 0}
        onChange={(e) => handleChange(e.target.value)}
        disabled={disabled}
      />
    </AparitionBodyCell>
  );
}

export default MinutesCell;