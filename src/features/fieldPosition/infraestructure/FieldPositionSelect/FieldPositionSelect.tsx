"use client";
import { Checkbox } from "@/components/ui/checkbox";
import { usePlayersStore } from "@/context/PlayersCtx";
import { cn } from "@/lib/utils";
import { useMemo } from "react";

function FieldPositionSelect() {
  const { allFieldPositions, updateSelectedPlayerPositions, selectedPlayer } =
    usePlayersStore((state) => state);

  const playerPositions: string[] = useMemo(() => {
    return (
      selectedPlayer?.playerPositions?.map((x) => x.fieldPosition?.id ?? "") ??
      []
    );
  }, [selectedPlayer?.playerPositions]);

  const onCheckedChange = (checked: boolean | string, pos: string) => {
    if (checked === true) {
      updateSelectedPlayerPositions([...playerPositions, pos]);
    }
    if (checked === false) {
      updateSelectedPlayerPositions(playerPositions.filter((x) => x !== pos));
    }
  };

  if (!selectedPlayer) return null;
  return (
    <div>
      {allFieldPositions.map((item) => (
        <div key={item.id} className="flex items-center gap-2">
          <Checkbox
            id={`field-position-${item.id}`}
            name={`field-position-${selectedPlayer?.id}`}
            checked={playerPositions.includes(item.id ?? "")}
            onCheckedChange={(checked) => onCheckedChange(checked, item.id!)}
            disabled={selectedPlayer.favPositionId === item.id}
          />
          <label
            htmlFor={`field-position-${item.id}`}
            className={cn(
              "flex gap-2",
              selectedPlayer.favPositionId === item.id && "line-through"
            )}
          >
            <span>{item.name}</span>
            <span className="text-slate-400">({item.id})</span>
          </label>
        </div>
      ))}
    </div>
  );
}

export default FieldPositionSelect;
