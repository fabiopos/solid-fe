import { TabsList, TabsTrigger } from "@/components/ui/tabs";
import { usePlayersStore } from "@/context/PlayersCtx";
import React from "react";

function PlayersFtTabList() {
  const { players, filteredPlayers, categories, onlyActive } = usePlayersStore(
    (state) => state
  );
  const playersByStatus = players.filter((x) => x.active === onlyActive);
  return (
    <TabsList>
      <TabsTrigger value="all">
        All Players ({playersByStatus.length})
      </TabsTrigger>
      {categories.map((x) => (
        <TabsTrigger key={x} value={x ?? ""} className="capitalize">
          {x.toLowerCase()} (
          {(filteredPlayers[x] ?? []).filter((x) => x.active === onlyActive)
            .length ?? 0}
          )
        </TabsTrigger>
      ))}
    </TabsList>
  );
}

export default PlayersFtTabList;
