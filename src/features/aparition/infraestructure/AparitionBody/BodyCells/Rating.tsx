import React, { useCallback } from "react";
import AparitionBodyCell from "../AparitionBodyCell";
import { Input } from "@/components/ui/input";
import { useMatchDetailsStore } from "@/context/MatchDetailsCtx";

interface RatingCellProps {
  playerId: string;
  rating?: number | null;
}
function RatingCell({ playerId, rating }: RatingCellProps) {
  const setRating = useMatchDetailsStore((state) => state.setRating);

  const handleChange = useCallback(
    (value: string) => {
        setRating(playerId, Number(value));
    },
    [playerId]
  );

  return (
    <AparitionBodyCell>
      <Input
        type="number"
        max={10}
        step={0.1}
        min={0}
        defaultValue={rating ?? 0}
        onChange={(e) => handleChange(e.target.value)}
      />
    </AparitionBodyCell>
  );
}

export default RatingCell;
