import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { useSolidStore } from "@/providers/store.provider";
import { selectOnlyActive } from "@/stores/selectors";
import Link from "next/link";
import React from "react";

function PlayersFtHeader() {
  const setOnlyActive = useSolidStore((state) => state.setOnlyActive);
  const onlyActive = useSolidStore(selectOnlyActive);
  return (
    <div className="flex justify-end">
      <div className="flex items-center space-x-4">
        <div className="flex items-center space-x-2">
          <Switch
            id="active-players"
            onCheckedChange={setOnlyActive}
            checked={onlyActive}
          />
          <Label htmlFor="airplane-mode">
            {onlyActive ? "Only inactive" : "Only active"}
          </Label>
        </div>

        <Link
          href={`/players/new`}
          className="text-sm hover:underline-offset-2 my-2 border py-2 px-4 dark:bg-slate-500 bg-primary text-white hover:bg-primary/90 rounded-lg"
        >
          Add New Player
        </Link>
      </div>
    </div>
  );
}

export default PlayersFtHeader;
