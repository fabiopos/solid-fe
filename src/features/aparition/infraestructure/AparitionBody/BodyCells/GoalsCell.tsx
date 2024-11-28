import React, { useCallback } from "react";
import AparitionBodyCell from "../AparitionBodyCell";
import { Input } from "@/components/ui/input";
import { useMatchDetailsStore } from "@/context/MatchDetailsCtx";

interface GoalsCellProps {
  playerId: string;
  goals?: number | null;
}
function GoalsCell({ playerId, goals }: GoalsCellProps) {
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
        max={2}
        step={1}
        min={0}
        defaultValue={goals ?? 0}
        onChange={(e) => handleChange(e.target.value)}
      />
    </AparitionBodyCell>
  );
}

export default GoalsCell;
