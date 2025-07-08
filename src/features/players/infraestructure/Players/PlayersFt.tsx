"use client";
import { Tabs } from "@/components/ui/tabs";
import { usePlayersStore } from "@/context/PlayersCtx";
import FieldPositionModal from "@/features/fieldPosition/infraestructure/FieldPositionModal/FieldPositionModal";
import PlayersFtHeader from "./PlayersFtHeader";
import PlayersFtTabList from "./Tabs/PlayersFtTabList";
import PlayersTabContent from "./Tabs/PlayersTabContent";
import { useMemo } from "react";

function PlayersFt() {
  const { players, filteredPlayers, tab, setTab, onlyActive } = usePlayersStore(
    (state) => state
  );

  const playersByStatus = players.filter((x) => x.active === onlyActive);

  const playersFilteredByStatus = useMemo(() => {
    return (filteredPlayers[tab] ?? []).filter((x) => x.active === onlyActive);
  }, [filteredPlayers, tab, onlyActive]);

  return (
    <div>
      <PlayersFtHeader />

      <div className="border rounded-lg bg-background">
        <Tabs
          defaultValue={tab}
          className="w-full"
          onValueChange={(value) => setTab(value)}
        >
          <PlayersFtTabList />
          <PlayersTabContent tabValue="all" players={playersByStatus} />

          {tab !== "all" && (
            <PlayersTabContent
              tabValue={tab}
              players={playersFilteredByStatus}
            />
          )}
          <FieldPositionModal />
        </Tabs>
      </div>
    </div>
  );
}

export default PlayersFt;
