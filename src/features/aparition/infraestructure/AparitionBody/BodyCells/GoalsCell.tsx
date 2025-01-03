import React, { useCallback } from "react";
import AparitionBodyCell from "../AparitionBodyCell";
import { Input } from "@/components/ui/input";
import { useMatchDetailsStore } from "@/context/MatchDetailsCtx";

interface GoalsCellProps {
  playerId: string;
  goals?: number | null;
  disabled?: boolean;
}
function GoalsCell({ playerId, goals, disabled }: GoalsCellProps) {
  const setGoals = useMatchDetailsStore((state) => state.setGoals);

  const handleChange = useCallback(
    (value: string) => {
      setGoals(playerId, Number(value));
    },
    [playerId]
  );

  return (
    <AparitionBodyCell>
      <Input
        type="number"
        max={20}
        step={1}
        min={0}
        defaultValue={goals ?? 0}
        onChange={(e) => handleChange(e.target.value)}
        disabled={disabled}
      />
    </AparitionBodyCell>
  );
}

export default GoalsCell;
